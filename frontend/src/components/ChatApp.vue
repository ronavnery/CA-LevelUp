<template>
  <section class="chat-app" v-if="chats.length">
    <div class="chat-boxes" v-for="(chat,idx) in chats" :key="idx">
      <ChatBox v-if="chat.isShown" :chat="chat" @sendMsg="sendMsg" @closeChat="closeChat(chat)" />
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";
import ChatBox from "./ChatBox";

export default {
  name: "chat-app",
  data() {
    return {
      socket: process.env.NODE_ENV === 'production' ? io(''):io("localhost:3000")
    };
  },

  mounted() {
    this.socket.emit("chat-join", this.connectedUser._id);
    this.socket.on("got-history", history => {
      this.$store.commit({ type: "pushHistory", history });
    });

    this.socket.on(`msg-received`, msg  => {
      this.$store.commit({ type: "addMsg", msg });
    });


  },

  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    chats() {
      return this.$store.getters.chats;
    }
  },
  methods: {
    sendMsg(msg) {
      this.$store.commit({ type: "addMsg", msg });
      this.socket.emit("msg-sent", msg);
    },
    getHistory(routes) {
      this.socket.emit("history", routes);
    },
    closeChat(chat) {
      this.$store.commit({ type: "closeChat", chat });
    }
  },
  components: { ChatBox }
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
