<template>
  <section class="levelup-confirm">
    <form>
      <p>Aweome! Before you level up, please add some info about you so the person gets to know you better!</p>
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
  }
};
</script>

<style scoped lang="scss">
.levelup-confirm {
  max-width: 300px;
  background: $tpGray2;
  position: fixed;
  height: 100%;
  right: 0;
}
.levelup-confirm form {
  display: flex;
  flex-direction: column;
}

.levelup-confirm form > label ,p {
  padding: 0 10px
}

.levelup-confirm form > input ,textarea{
  margin: 10px;
}

.level-up-btn{
  @include btnActionColorSm;
  width: 50%;
    place-self: center;
}

</style>
