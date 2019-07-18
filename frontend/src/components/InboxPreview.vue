<template>
  <div class ="inbox">
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
      msgs: ['hi','how','are','you'],
      socket: io("localhost:3000")
    };
  },

  created() {
    const inboxId = this.$store.getters.connectedUser._id
        console.log(inboxId)
    this.$store.dispatch({ type: "getUserInbox", inboxId})
  },

  methods: {
    
  },
  
//    mounted() {
//      const inboxId = this.$store.getters.connectedUser._id
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
//    }
};
</script>

<style lang="scss" scoped>
.inbox{
  position: relative;
}
.inbox-preview {
  position: absolute;
  right: 0;
}
</style>
