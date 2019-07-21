<template>
  <div class="profile-container flex">
    <profile-sidebar v-if="currProfile" :profile="currProfile" />
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
