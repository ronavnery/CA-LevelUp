<template>
  <section class="levelup-booking fs14">
    <form class="booking-form" v-if="connectedUser">
      <h4 class="text-center">Contact to levelup!</h4>
      <p>Before you level up, please add some info about you so the person gets to know you better!</p>
      <label for="reason">What makes you want to get this skill?</label>
      <textarea v-model="bookingReq.reason" id="reason" type="text" />
      <label for="availability">Hows your availability?</label>
      <textarea v-model="bookingReq.availability" id="availability" type="text" />
      <label for="extraInfo">What more should this person know about you?</label>
      <textarea v-model="bookingReq.extraInfo" id="extraInfo" type="text" />

      <input
        id="levelUp"
        class="level-up-btn"
        @click.prevent="sendBookingReq"
        value="Level Me Up"
        type="submit"
      />
      <p class="success-status">{{successStatus}}</p>
    </form>
    <div class="login-msg fs18" v-else-if="!connectedUser">
      Level up requests are for registered users only.
      <br />Please
      <router-link to="/sign-up">sign-up</router-link>or
      <router-link to="/login">login</router-link>first.
    </div>
    <div v-else>
      Your request has been sent, we will notify you
    </div>
    <button class="btn-toggle-booking" @click="toggleBooking">Close</button>
  </section>
</template>

<script>
import io from "socket.io-client";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      bookingReq: {
        reason: "",
        availability: "",
        extraInfo: ""
      },
      alreadyBooked: false,
      successStatus: "",
      socket: process.env.NODE_ENV === 'production' ? io(''):io("localhost:3000")
    };
  },
  created() {
  //   this.alreadyBooked = this.inboxSent.find(
  //     booking => booking.bookingMaker.makerId === this.connectedUser._id
  //   );
    console.log(this.inboxSent)
    // console.log(this.connectedUser._id)
    // console.log(this.alreadyBooked)
  },
  methods: {
    async sendBookingReq() {
      this.bookingReq.offer = {
        offerId: this.$store.getters.getCurrOffer._id,
        offerTitle: this.$store.getters.getCurrOffer.title,
        offerType: this.$store.getters.getCurrOffer.type,
        offerImg: this.$store.getters.getCurrOffer.imgs[0]
      };
      this.bookingReq.offerMaker = {
        makerId: this.$store.getters.currProfile._id,
        makerName: this.$store.getters.currProfile.name,
        makerImg: this.$store.getters.currProfile.imgUrl
      };
      this.bookingReq.bookingMaker = {
        makerId: this.connectedUser._id,
        makerName: this.connectedUser.name,
        makerImg: this.connectedUser.imgUrl
      };
      if (
        this.bookingReq.offer.offerId === this.bookingReq.bookingMaker.makerId
      )
        return;
      const booking = await this.$store.dispatch({
        type: "sendBookingReq",
        bookingReq: this.bookingReq
      });
      this.startChat(booking);
      this.socket.emit("level-up-req", booking);
      this.successStatus = 'Your booking has been sent'
      setTimeout(() => {
this.toggleBooking()
}, 1000);
    },
    startChat(booking) {
      const user1 = {
        _id: this.connectedUser._id,
        imgUrl: this.connectedUser.imgUrl,
        name: this.connectedUser.name
      };
      const user2 = {
        _id: booking.offerMaker.makerId,
        imgUrl: booking.offerMaker.makerImg,
        name: booking.offerMaker.makerName
      };
      this.socket.emit("start-chat", { user1, user2 });
      this.$store.commit({ type: "startChat", user1, user2 });
    },
    toggleBooking() {
      this.$emit("close-booking-request");
    }
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    inboxSent() {
      return this.$store.getters.inboxSent;
    }
  }
};
</script>

<style scoped lang="scss">
.btn-toggle-booking {
  @include btnActionGreySm;
  width: 100px;
}
.levelup-booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  max-width: 400px;
  min-width: 300px;
  background: $tpWhite;
  position: fixed;
  height: calc(100% - 50px);
  right: 0;
  top: 50px;
  border-left: 0.1px solid $tpGray3;
  padding: 20px;
  overflow: auto;
}

.levelup-booking form {
  @include flexCustom(center, left, column);
  margin-bottom: 70px;
}

.levelup-booking form > label,
p {
  padding: 0 10px;
}

.levelup-booking form > input,
textarea {
  margin: 10px;
}

.level-up-btn {
  @include btnActionColorSm;
  width: 50%;
  place-self: center;
}

.login-msg {
  padding: 40px;
  a {
    color: $tpPink;
  }
}

.success-status {
  color: $tpPink;
}
</style>
