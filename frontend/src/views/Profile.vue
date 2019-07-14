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
      currOffer: null,
      currProfileAllOffers: null
    };
  },
  async created() {
    try {
      const profile = await this.$store.dispatch({type: 'getProfile', userName: this.$route.params.userName})
      this.currProfile = profile
    }
    catch(err) {
      console.log('Error!', err);
    }
    try {

      const currOffer = await this.$store.dispatch({type: 'loadOffers', userName: this.$route.params.userName })
      this.currOffer = currOffer
    }
    catch(err) {
      console.log('Error!', err);
    }

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
