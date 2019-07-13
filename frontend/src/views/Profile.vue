<template>
  <div class="profile-container flex">
    <profile-sidebar :profile="getCurrProfile"/>
    <offer-details :currOffer="getCurrOffer"/>
  </div>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
import OfferDetails from "../components/OfferDetails";
export default {
  name: "Profile",
  computed: {
    getCurrProfile() {
      return this.$store.getters.getCurrProfile
    },
    getCurrOffer() {
      console.log(this.$store.getters.getCurrOffer)
      return this.$store.getters.getCurrOffer
    }
  },
  components: {
    ProfileSidebar,
    OfferDetails
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  flex: 1;
}
</style>
