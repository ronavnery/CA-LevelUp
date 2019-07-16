<template>
  <section class="levelup-booking fs14">
    <form>
      <h4 class="text-center">Contact to levelup!</h4>
      <p>Before you level up, please add some info about you so the person gets to know you better!</p>
      <label for="reason">What makes you want to get this skill?</label>
      <textarea v-model="bookingReq.reason" id="reason" type="text" />
      <label for="availability">Hows your availability?</label>
      <textarea v-model="bookingReq.availability" id="availability" type="text" />
      <label for="userDetails">What more should this person know about you?</label>
      <textarea v-model="bookingReq.userDetails" id="userDetails" type="text" />
      <input id="levelUp" class="level-up-btn" @click.prevent="sendBookingReq" value="Level Me Up" type="submit" />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bookingReq: {
        reason: '',
        availability: '',
        userDetails: ''
      }
    }
  },
  methods: {
    sendBookingReq() {
      this.$emit("booking-set", this.bookingReq)
    } 
  },
  computed: {
    offer() {
      return this.$store.getters.getCurrOffer
    }
  }
};
</script>

<style scoped lang="scss">
.levelup-booking {
  z-index: 1;
  max-width: 400px;
  background: $tpWhite;
  position: fixed;
  height: 100%;
  right: 0;
  border-left: 0.1px solid $tpGray3;
}

.levelup-booking form {
  @include flexCustom(center, left, column)
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

</style>
