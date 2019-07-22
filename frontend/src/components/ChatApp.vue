<template>
  <section class="chat-app" v-if="chats.length">
    <div class="chat-boxes" v-for="(chat,idx) in chats" :key="idx">
      <ChatBox :chat="chat" @sendMsg="sendMsg" @closeChat="closeChat(idx)" />
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";
import ChatBox from "./ChatBox";

export default {
  name: 'chat-app',
  data() {
    return {
      socket: io("localhost:3000"),
    };
  },

  mounted() {
    this.socket.emit("JOIN_ROOM", this.connectedUser._id);
    this.socket.on(`msg-received`, ( data ) => {
      const idx = this.chats.findIndex(chat => chat.to.nickName === data.from.nickName);
      if (idx !== -1) {
        this.chats[idx].msgs.push(data.msg);
      } else {
        this.chats.push({ to: data.from, from: data.to, msgs: [data.msg] });
      }
    });
  },

  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    chats() {
      return this.$store.getters.chats
    }
  },
  methods: {
    async sendMsg(msg){
      try {
        const newMsg = await this.$store.dispatch({type: 'sendMsg', msg})
        console.log(newMsg)
        this.socket.emit("msg-sent", newMsg);
      }catch (err) {
        console.log(err)
      }

    },
    closeChat(idx) {
      this.$store.commit({type: 'closeChat',idx})
    }
  },
  components: {ChatBox}
};
</script>

<style lang="scss" scoped>
.chat-app {
  z-index: 10;
  display: flex;
  position: fixed;
  bottom: 0;
}
.chat-boxes {
  display: flex;
  margin-left: 30px;
  width: 200px;
}
</style>
