<template> 
  <section class="levelup-booking fs14">
    <form class="booking-form" v-if="userConnected">
      <h4 class="text-center">Contact to levelup!</h4>
      <p>Before you level up, please add some info about you so the person gets to know you better!</p>
      <label for="reason">What makes you want to get this skill?</label>
      <textarea v-model="bookingReq.reason" id="reason" type="text" />
      <label for="availability">Hows your availability?</label>
      <textarea v-model="bookingReq.availability" id="availability" type="text" />
      <label for="extraInfo">What more should this person know about you?</label>
      <textarea v-model="bookingReq.extraInfo" id="extraInfo" type="text" />
      <label for="extraInfo">What more should this person know about you?</label>
      <textarea v-model="bookingReq.extraInfo" id="extraInfo" type="text" />
      <label for="extraInfo">What more should this person know about you?</label>
      <textarea v-model="bookingReq.extraInfo" id="extraInfo" type="text" />
      <label for="extraInfo">What more should this person know about you?</label>
      <textarea v-model="bookingReq.extraInfo" id="extraInfo" type="text" />
      <label for="extraInfo">What more should this person know about you?</label>
      <textarea v-model="bookingReq.extraInfo" id="extraInfo" type="text" />
      
      <input id="levelUp" class="level-up-btn" @click.prevent="sendBookingReq" value="Level Me Up" type="submit" />
    </form>
    <div class="login-msg fs18" v-else>
      Level up requests are for registered users only.<br>
      Please <router-link to="/sign-up">sign-up</router-link> or <router-link to="/login">login</router-link> first.
      </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bookingReq: {
        reason: '',
        availability: '',
        extraInfo: ''
      }
    }
  },
  methods: {
    sendBookingReq() {
      this.bookingReq.offerId = this.$store.getters.getCurrOffer._id
      this.bookingReq.offererId= this.$store.getters.currProfile._id
      this.bookingReq.requesterId= this.$store.getters.connectedUser._id
      this.$store.dispatch({type: 'sendBookingReq', bookingReq: this.bookingReq})
    } 
  },
  computed: {
    userConnected() {
      return this.$store.getters.connectedUser
    }
  }
};
</script>

<style scoped lang="scss">
.levelup-booking {
  z-index: 1;
  max-width: 400px;
  min-width: 300px;
  background: $tpWhite;
  position: fixed;
  height: 100%;
  right: 0;
  border-left: 0.1px solid $tpGray3;
  padding: 20px;
  overflow: auto;
}

.levelup-booking form {
  @include flexCustom(center, left, column);
  margin-bottom: 70px;
}

.levelup-booking form > label ,p {
  padding: 0 10px
}

.levelup-booking form > input ,textarea{
  margin: 10px;
}

.level-up-btn{
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

</style>
