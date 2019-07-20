<template>
  <div>
    <ul v-if="isOpen" class="inbox">
      <li class="inbox-preview" v-for="(msg,idx) in msgs" :key="idx" @click="openChat(msg.recipient._id)">
        <h2>{{msg.recipient.name}}</h2>
        <p>{{msg.msgs[0].txt}}</p>
        <p>{{msg.msgs[0].createdAt | formatDate}}</p>
        {{msg}}
      </li>
    </ul>
    <ChatBox v-if="chatOpen" :directors="directors" class="chat-box"/>
  </div>
</template>


<script>
import io from "socket.io-client";
import moment from "moment";
import ChatBox from './ChatBox'

export default {
  props: {
    isOpen: {
      type: Boolean
    }
  },
  name: "inbox-preview",
  data() {
    return {
      inboxId: null,
      chatOpen:false,
      recipient: null,
      user: "samuel",
      msg: "",
      msgs: [
        {
          recipient: {
            _id: '5d2dec114cfb9f419072650d',
            name: "jihri"
          },
          msgs: [
            {
              txt: "hey how are you",
              createdAt: 1565044340240
            }
          ]
        }
      ],
      socket: io("localhost:3000")
    };
  },

  created() {
    this.inboxId = this.$store.getters.connectedUser._id;

    // this.$store.dispatch({ type: "getUserInbox", inboxId})
  },

  methods: {
    openChat(recipient) {
      this.directors = {recipient, sender: this.inboxId}
      this.chatOpen = true;
    }
  },

  components: {
    ChatBox
  },

  mounted() {
    let connected = [];
    const userId = this.$store.getters.connectedUser._id;

    this.socket.on(`incoming:${userId}`, ({ fromId }) => {
      if (!connected.includes(fromId)) {
        connected.push(fromId);

        this.socket.on(
          `message:${userId}:${fromId}`,
          ({ message, senderId }) => {
            this.msgs.push({ message, senderId });
            console.log(message, senderId);
          }
        );
      }
    });
    //      console.log(inboxId)
    //     //  this.socket.on("MESSAGE", data => {
    //     //    this.msgs = [...this.msgs, data];
    //     //  });
    //     //  this.socket.emit("inbox join", {

    //     //  });
    //     this.socket.emit("SEND_MESSAGE", {
    //         user: this.user,
    //         message: this.msg,
    //         roomId: this.$route.params.id

    //       });
    //      this.socket.emit("history", inboxId)
  }
};
</script>

<style lang="scss" scoped>
.inbox {
  position: absolute;
  right: 0;
  z-index: 10;
  width: 200px;
  top: 49px;
  background-color: #1c2129;
  color: white;
}

.chat-box{
  border: #f1f0f0 1px solid;
  border-radius: 3px;
  position: fixed;
  right: 10px;
  z-index: 10;
  bottom: 0;
  color: white;
}

</style>
