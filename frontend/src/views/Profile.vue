<template>
  <div class="profile-container flex">
    <profile-sidebar :profile="getCurrProfile"/>
    <profile-content/>
  </div>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileContent from "../components/ProfileContent";

export default {
  name: "Profile",
  computed: {
    getCurrProfile() {
      return this.$store.getters.getCurrProfile
    }
  },
  components: {
    ProfileSidebar,
    ProfileContent
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  flex: 1;
}
</style>
