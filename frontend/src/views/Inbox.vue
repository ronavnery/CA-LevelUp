<template>
  <div>
    <h2>offer sent</h2>
    <ul v-if="inboxRecieved.length" class="inbox studend-inbox">
      <li v-for="(booking,idx) in inboxSent" :key="idx">
        <div class="left-layout">
          <h3 class="offer-title">{{booking.offer.offerTitle}}</h3>
          <img :src="booking.offer.offerImg" />
        </div>
        <div class="right-layout">
          <div class="offer-creator">
            <img :src="booking.offerMaker.makerImg" alt />
            <p>{{booking.offerMaker.makerName}}</p>
          </div>
          <p v-if="booking.isConfirmed">Status: Confirmed</p>
          <p v-else>Status: Pending</p>
        </div>
      </li>
      <!-- {{booking}} -->
    </ul>
    <p v-else>Nothing to show yet</p>
    <h2>offer Recieved</h2>
    <ul v-if="inboxRecieved.length" class="inbox teacher-inbox">
      <li class="inbox-preview" v-for="(booking,idx) in inboxRecieved" :key="idx">
        <img :src="booking.bookingMaker.makerImg" width="100px" alt />
        <div class="details-container">
          <p>{{booking.bookingMaker.makerName}}</p>
          <p>{{booking.sentAt | formatDate}}</p>
        </div>
        <button>start chat</button>
        <div class="confirm-buttons">
          <button @click.stop="sendConfirm(booking, true)">Confirm</button>
          <button @click.stop="sendConfirm(booking, false)">Not now</button>
        </div>
      </li>
    </ul>
    <p v-else>Nothing to show yet</p>
    <ChatBox v-if="shtok" :directors="directors" class="chat-box" />
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      shtok: false,
      socket: io("localhost:3000")
    };
  },

  async created() {
    try {
      const inbox = await this.$store.dispatch({
        type: "getInbox",
        connectedUserId: this.connectedUser._id
      });
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    inboxSent() {
      return this.$store.getters.inboxSent;
    },
    inboxRecieved() {
      return this.$store.getters.inboxRecieved;
    }
  },
  methods: {
    async sendConfirm(booking, confirmation) {
      booking.isConfirmed = confirmation;
      const newBooking = await this.$store.dispatch({type: "sendConfirm", booking});
      console.log(newBooking)
      // this.socket.emit("confirmed", newBooking);
    }
  }
};
</script>


<style scoped lang="scss">
p {
  margin: 0;
}
li {
  list-style-type: none;
  position: relative;
  display: flex;
  border: 1px solid #abaeb4;
  margin: 7px;
}
.left-layout {
  margin-right: 10px;

  & > img {
    min-width: 150px;
    max-width: 150px;
  }
  & > .offer-title {
    position: absolute;
    left: 0;
    background: rgba(61, 43, 97, 0.7);
    width: 150px;
    padding: 3px;
  }
}
.right-layout {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > .offer-creator {
    display: flex;
    margin-bottom: 4px;

    & > img {
      object-fit: cover;
      margin-right: 10px;
      height: 30px;
      width: 30px;

      border-radius: 50%;
    }
  }
}

h2 {
  margin-left: 10px;
}
h3 {
  font-size: 1em;
  color: #fff;
  font-weight: bold;
}
</style>
