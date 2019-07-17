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
  methods: {
    
  },
  
   mounted() {
     const inboxId = this.$store.getters.connectedUser._id
    //  this.socket.on("MESSAGE", data => {
    //    this.msgs = [...this.msgs, data];
    //  });
    //  this.socket.emit("inbox join", {
       
    //  });
     this.socket.on("get_history", inboxId => {
       this.msgs = [...this.msgs, ...data];
     });
   }
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
