<template>
  <div class="inbox-content">
    <span class="content-title fs18">Bookings sent</span>
    <ul v-if="inboxSent.length" class="inbox-received">
      <li v-for="(booking,idx) in inboxSent" :key="idx">
        <div class="left-layout">
          <span class="offer-title strong">{{booking.offer.offerTitle}}</span>
          <img :src="booking.offer.offerImg" />
        </div>
        <div class="right-layout">
          <div class="offer-creator">
            <img :src="booking.offerMaker.makerImg" alt />
            <p>{{booking.offerMaker.makerName}}</p>
          </div>
          <p v-if="booking.isConfirmed==='pending'">Status: Pending</p>
          <p v-else>Status: Confirmed</p>
          <button class="start-chat-btn" @click="startChat(booking.offerMaker.makerId)">start chat</button>
        </div>
      </li>
      <!-- {{booking}} -->
    </ul>
    <p v-else>Nothing to show yet</p>
    <span class="content-title fs18">Bookings received</span>
    <ul v-if="inboxRecieved.length" class="inbox-received">
      <li class="inbox-preview" v-for="(booking,idx) in inboxRecieved" :key="idx">
        <div class="left-layout">
          <span class="offer-title">{{booking.offer.offerTitle}}</span>
          <img :src="booking.offer.offerImg" width="100px" alt />
        </div>
        <div class="right-layout">
          <div class="right-user-details">
            <p>{{booking.bookingMaker.makerName}}</p>
            <div class="confirm-buttons" v-if="booking.isConfirmed==='pending'">
              <button class="confirm-btn" @click.stop="sendConfirm(booking, true)">Confirm</button>
              <button class="notnow-btn" @click.stop="sendConfirm(booking, false)">Not now</button>
            </div>
          </div>
          <div class="action-btns">
            <button
              class="start-chat-btn"
              @click="startChat(booking.bookingMaker.makerId)"
            >start chat</button>
            <span class="fs12">{{booking.sentAt | formatDate}}</span>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>Nothing to show yet</p>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket:
        process.env.NODE_ENV === "production" ? io("") : io("localhost:3000")
    };
  },

  async created() {
    try {
      await this.$store.dispatch({
        type: "getInbox",
        connectedUserId: this.connectedUser._id
      });
      this.$store.commit({ type: "removeNotification" });
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
      await this.$store.dispatch({
        type: "sendConfirm",
        booking
      });
      this.socket.emit("req-updated", booking);
    },

    startChat(toId) {
      this.$store.commit({ type: "showChat", toId });
    }
  }
};
</script>


<style scoped lang="scss">
.inbox-content {
  padding: 20px;
  .inbox-received,
  .inbox-sent {
    margin-top: 20px;
  }
}
p {
  margin: 0;
}

.content-title {
  margin-bottom: 10px;
  font-weight: 700;
}

ul {
  border-radius: 4px;
  border: 0.5px solid black;
  padding: 0px;
  max-width: 700px;
}
li {
  list-style-type: none;
  position: relative;
  display: flex;
  max-width: 700px;
  border: 1px solid #abaeb4;
  // margin: 7px;
  box-sizing: border-box;

  &:hover {
    background: #d4c9cd94;
  }
}
.left-layout {
  margin-right: 10px;

  & > img {
    width: 150px;
    width: 150px;
    border-radius: 4px;
  }
  & > .offer-title {
    color: $tpWhite;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #ca789194;
    width: 150px;
    padding: 3px;
  }
}
.right-layout {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
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
  .action-btns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .right-user-details {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
  .confirm-buttons * {
    margin-right: 10px;
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

.start-chat-btn {
  @include btnActionGreySm;
}

.confirm-btn {
  @include btnActionColorSm;
}
.notnow-btn {
  @include btnActionGreySm;
}
</style>
