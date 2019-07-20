<template>
  <main>
    <div class="chat-header" @click="toggleChat()">
      <p>user name</p>
      <button v-if="isOpen" @click.stop="toggleChat()">X</button>
    </div>
    <div v-if="isOpen">
      <section ref="chatArea" class="chat-area">
        <p
          v-for="(message,idx) in messages"
          :key="idx"
          class="message"
          :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }"
        >{{ message.body }}</p>
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
  import io from "socket.io-client";
export default {

  props: {
    directors: {
      type: Object
    }
  },
  data() {
    return {
      socket: io("localhost:3000"),
      isOpen: false,
      sender: null,
      msg: "",
      messages: [
        {
          body: "Welcome to the chat, I'm Bob!",
          author: "bob"
        },
        {
          body: "Thank you Bob",
          author: "you"
        },
        {
          body: "You're most welcome",
          author: "bob"
        }
      ]
    };
  },

  mounted() {
    this.socket.emit("JOIN_ROOM", this.directors.sender,);
    this.socket.on(`MESSAGE`, ({ message, senderId }) => {
      this.messages = [...this.messages, { message, senderId }];
      console.log(this.messages)
    });


    // this.socket.on("MESSAGE", data => {
    //   console.log(data)
    //   this.msgs = [...this.msgs, data];
    // });

    // this.socket.on("HISTORY", data => {
    //   this.msgs = [...this.msgs, ...data];
    // });
  },

  methods: {
    sendMsg() {
      console.log(this.directors)
      if (!this.msg && !this.msg) return
      this.socket.emit("SEND_MESSAGE", {
        recipientId: this.directors.recipient,
        senderId: this.directors.sender,
        message: this.msg
      });
      this.messages.push({ body: this.msg, author: "you" });
      this.msg = "";
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
  min-width: 250px;
  cursor: pointer;
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
  max-width: 350px;
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
