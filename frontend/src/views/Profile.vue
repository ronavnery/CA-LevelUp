<template>
  <div class="profile-container flex">
    <profile-sidebar :profile="currProfile" v-if="currProfile" />
    <profile-content @toggle-booking="toggleBooking" :currOffer="currOffer" />
  </div>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileContent from "../components/ProfileContent";

export default {
  name: "Profile",
  data() {
    return {
      currProfile: null,
      currOffer: null,
      currProfileAllOffers: null
    };
    
  },
  async created() {
    try {
      const profile = await this.$store.dispatch({
        type: "getProfile",
        nickName: this.$route.params.nickName
      });
      this.currProfile = profile;
    } catch (err) {
      console.log("Error!", err);
    }
  },
  components: {
    ProfileSidebar,
    ProfileContent,
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  flex: 1;
}
</style>
