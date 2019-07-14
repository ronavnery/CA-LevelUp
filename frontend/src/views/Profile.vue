<template>
  <div class="profile-container flex">
    <profile-sidebar :profile="getCurrProfile" />
    <profile-content @toggle-booking="toggleBooking" />
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
      isBooking: false
    };
  },
  created() {
    console.log('params:', this.$route.params);
    // this.$store.dispatch({type: 'getProfile', })
  },
  computed: {
    getCurrProfile() {
      return this.$store.getters.getCurrProfile;
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
