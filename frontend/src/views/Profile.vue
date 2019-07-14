<template>
  <div class="profile-container flex">
    <profile-sidebar :profile="currProfile" v-if="currProfile" />
    <profile-content @toggle-booking="toggleBooking" :currOffer="currOffer" v-if="currOffer" />
    <bookingLevelUp v-if="isBooking" @booking-set="sendBookingReq" />
  </div>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileContent from "../components/ProfileContent";
import bookingLevelUp from "../components/bookingLevelUp";

export default {
  name: "Profile",
  data() {
    return {
      isBooking: false,
      currProfile: null,
      currOffer: null
    };
  },
  created() {
    // console.log('params:', this.$route.params);
    console.log('params userId',this.$route.params)
    this.$store.dispatch({type: 'getProfile', userId: this.$route.params.userId})
      .then((profile) => {
        console.log('got profile!', profile)
        this.currProfile = profile
        this.$store.dispatch({type: 'getOfferById',offerId: this.$route.params.offerId })
          .then((currOffer) => {
        console.log('got offer!', currOffer)
            this.currOffer = currOffer
            console.log('done!!!')
          })
      })
  },
  methods: {
    sendBookingReq(bookingReq) {
      this.isBooking = false;
      bookingReq.offerId = this.$store.getters.getCurrOffer._id;
      // bookingReq.reqUserId = this.$store.getters.
      this.$store.dispatch({ type: "sendBookingReq", bookingReq });
    },
    toggleBooking() {
      this.isBooking = !this.isBooking;
    }
  },
  components: {
    ProfileSidebar,
    ProfileContent,
    bookingLevelUp
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  flex: 1;
}
</style>
