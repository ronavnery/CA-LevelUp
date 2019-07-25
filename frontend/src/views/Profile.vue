<template>
  <div class="profile-container flex">
    <profile-sidebar v-if="currProfile && showProfileSidebar" :profile="currProfile" />
    <profile-content />
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
      showProfileSidebar: true
    };
    
  },
  async created() {
    this.checkIfOfferDetails();
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
  },
  methods: {
    checkIfOfferDetails() {
      if (this.$route.params.nickName && this.$route.params.offerId) this.showProfileSidebar = false
      else this.showProfileSidebar = true;
    }
  },
  watch: {
    '$route': {
      handler() {
        this.checkIfOfferDetails();
      },
      deep: true
    }
  }
};

</script>

<style scoped lang="scss">
.profile-container {
  height: calc(100vh - 50px);
  flex: 1;
}
</style>
