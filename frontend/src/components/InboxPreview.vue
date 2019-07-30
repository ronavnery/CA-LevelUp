<template>
  <div v-if="isOpen">
    <ul v-if="isOpen" class="inbox studend-inbox">
      <li v-for="(booking,idx) in pendingBookings" :key="idx">
        <img
          :src="booking.offer.offerImg"
          width="100px" />
        <div class="details-container">
        <p>{{booking.offer.offerTitle}}</p>
        <p v-if="booking.isConfirmed">Confirmed</p>
        <p v-else>Pending</p>
        </div>
      </li>
    </ul>
    <ul v-if="isOpen" class="inbox teacher-inbox">
      <li
        class="inbox-preview"
        v-for="(booking,idx) in bookings"
        :key="idx"
        @click="openChat(booking)"
      >
        <img :src="booking.bookingMaker.makerImg" width="100px"
 alt />
        <div class="details-container">
        <p>{{booking.bookingMaker.makerName}}</p>
        <p>{{booking.sentAt | formatDate}}</p>
        </div>
        <button>start chat</button>
        <button
          @click.stop="sendConfirm({userId:booking.bookingMaker.makerId, offerId: booking.offer.offerId, isConfirmed:true})"
        >Confirm</button>
        <button
          @click.stop="sendConfirm({userId:booking.bookingMaker.makerId, offerId: booking.offer.offerId, isConfirmed:false})"
        >Not now</button>
      </li>
    </ul>
  </div>
</template>


<script>
import io from "socket.io-client";
import moment from "moment";

export default {
  props: {
    isOpen: {
      type: Boolean
    }
  },
  name: "inbox-preview",
  data() {
    return {
      inboxId: null,
      chatOpen: false,
      recipient: null,
      user: "samuel",
      pendingBookings: [],
      bookings: [],
      socket: process.env.NODE_ENV === 'production' ? io(''):io("localhost:3000")
    };
  },

  created() {
    this.inboxId = this.$store.getters.connectedUser._id;
    // this.$store.dispatch({ type: "getUserInbox", inboxId})
  },

  methods: {
    openChat(recipient) {
      this.directors = { recipient, sender: this.inboxId };
      this.chatOpen = true;
    },
    sendConfirm(confirm) {
      this.socket.emit("confirmed", confirm);
    }
  },

  mounted() {
    const userId = this.$store.getters.connectedUser._id;

    this.socket.emit("JOIN_ROOM", userId);
    // this.socket.on("req-sent", booking => this.bookings.push(booking));
    this.socket.on("booking-sent", booking =>{
      this.pendingBookings.push(booking)
    }
    );
    this.socket.on("req-ans", ans => {
      const pendingBooking = this.pendingBookings.find(
        booking => booking.offer.offerId === ans.offerId
      );
      console.log(pendingBooking)
      pendingBooking.isConfirmed = ans.isConfirmed;
    });

    // this.socket.on(`incoming:${userId}`, ({ fromId }) => {
    //   if (!connected.includes(fromId)) {
    //     connected.push(fromId);

    //     this.socket.on(
    //       `message:${userId}:${fromId}`,
    //       ({ message, senderId }) => {
    //         this.bookings.push({ message, senderId });
    //         console.log(message, senderId);
    //       }
    //     );
    //   }
    // });
    //      console.log(inboxId)
    //     //  this.socket.on("MESSAGE", data => {
    //     //    this.bookings = [...this.bookings, data];
    //     //  });
    //     //  this.socket.emit("inbox join", {

    //     //  });
    //     this.socket.emit("SEND_MESSAGE", {
    //         user: this.user,
    //         message: this.booking,
    //         roomId: this.$route.params.id

    //       });
    //      this.socket.emit("history", inboxId)
  }
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  &>img {
    border-radius: 50%;
    padding: 10px;
  }
  &>p {
    font-size: 0.75rem
  }
  p:last-child {
    color: #90949c ;
  }
}


.inbox {
  position: absolute;
  right: 0;
  z-index: 10;
  width: 500px;
  top: 49px;
  background-color: #ECF3FF;
  color: #220F41;
}

.details-container {
  display: flex;
  flex-direction: column;
 &>*{
   margin: 0;
   padding: 0;
 }
}

.chat-box {
  border: #f1f0f0 1px solid;
  border-radius: 3px;
  position: fixed;
  right: 10px;
  z-index: 10;
  bottom: 0;
  color: white;
}
</style>
