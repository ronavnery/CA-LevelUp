<template>
  <form @submit.prevent="sendMsg" v-if="userId">
    <input v-model="msg" />
    <button>send</button>
    <ul>
      <li v-for="(m,idx) in msgs" :key="idx">{{m}}</li>
    </ul>
  </form>
</template>

<script>
import io from "socket.io-client";

export default {
  props: {
    userId: {
      type: String
    }
  },
  data() {
    return {
      msg: "",
      msgs: [],
      fromId: "",
      socket: (process.env.NODE_ENV === 'production') ? io(''):io("localhost:3000")
    };
  },

  created() {
    this.fromId = this.$store.getters.connectedUser._id;
    // this.offerOwnerId = this.userId;
  },

  mounted() {
    const { userId: ownerId, fromId } = this;

    this.socket.emit("JOIN", {
      ownerId,
      fromId
    });

    this.socket.on(`message:${ownerId}:${fromId}`, ({ message, senderId }) => {
      this.msgs = [...this.msgs, { message, senderId }];
    });
    



    // this.socket.on("MESSAGE", data => {
    //   console.log(data)
    //   this.msgs = [...this.msgs, data];
    // });

    // this.socket.emit("JOIN_ROOM", {
    //   roomId: this.fromId
    // });
    // this.socket.on("HISTORY", data => {
    //   this.msgs = [...this.msgs, ...data];
    // });
  },

  methods: {
    sendMsg() {
      this.socket.emit("SEND_MESSAGE", {
        fromId: this.fromId,
        ownerId: this.userId,
        senderId: this.fromId,
        message: this.msg
      });
      this.msg = "";
    }
  }
};
</script>