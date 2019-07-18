<template>
  <div class="inbox">
    <ul v-if="isOpen">
      <li class="inbox-preview" v-for="(msg,idx) in msgs" :key="idx">{{msg}}</li>
    </ul>
  </div>
</template>


<script>
import io from "socket.io-client";

export default {
  props: {
    isOpen: {
      type: Boolean
    }
  },
  name: "inbox-preview",
  data() {
    return {
      user: "samuel",
      msg: "",
      msgs: ["hi", "how", "are", "you"],
      socket: io("localhost:3000")
    };
  },

  created() {
    const inboxId = this.$store.getters.connectedUser._id;

    // this.$store.dispatch({ type: "getUserInbox", inboxId})
  },

  methods: {},

  mounted() {
    let connected = [];
    const userId = this.$store.getters.connectedUser._id;

    this.socket.on(`incoming:${userId}`, ({ fromId }) => {
      if (!connected.includes(fromId)) {
        connected.push(fromId);

        this.socket.on(`message:${userId}:${fromId}`, ({ message,senderId }) => {
          console.log(message,senderId);
        });
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
  background-color: yellow;
}
.inbox-preview {
  right: 0;
}
</style>
