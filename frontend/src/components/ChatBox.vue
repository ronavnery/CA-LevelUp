<template>
  <main>
    <div class="chat-header" @click="toggleChat()">
      <img :src="chat.to.imgUrl" alt />
      <p>{{ chat.to.nickName }}</p>
      <button @click.stop="closeChat()">X</button>
    </div>
    <div v-if="isOpen">
      <section ref="chatArea" class="chat-area">
        <p
          v-for="(msg,idx) in chat.msgs"
          :key="idx"
          class="message"
          :class="{ 'message-in': msg.author === chat.to.nickName, 'message-out': msg.author !== chat.to.nickName }"
        >{{ msg }}</p>
      </section>
      <section>
        <form @submit.prevent="sendMsg" class="chat-input">
          <input v-model="msg" type="text" autocomplete="off" placeholder="Type your message" />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  </main>
</template>


<script>
export default {
  name: "chat-box",
  props: {
    chat: {
      type: Object
    }
  },
  data() {
    return {
      isOpen: false,
      msg: ""
    };
  },

  methods: {
    sendMsg() {
      if (!this.msg) return;
      const data = {
        to: this.chat.to,
        from: this.chat.from,
        msg: { txt: this.msg, author: this.chat.from.nickName }
      }
      this.$emit("sendMsg", data);
      this.msg = "";
    },
    closeChat() {
      this.$emit("closeChat");
    },
    toggleChat() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-header {
  color: black;
  background: #f1f0f0;
  margin: 0;
  display: flex;
  // justify-content: space-around;
  line-height: 30px;
  // min-width: 250px;
  cursor: pointer;
  & > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }
}
p {
  margin: 0 10px;
}

.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  // max-width: 350px;
  background: white;
  height: 40vh;
  padding: 1em;
  overflow: auto;
  // margin: 0 auto 2em auto;
  // box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
  font-size: 0.8em;
}
.message-out {
  background: #407fff;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-input {
  display: flex;
}
.chat-input > * {
  border: 0;
}
</style>
