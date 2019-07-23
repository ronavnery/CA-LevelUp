<template>
  <section>
    <div v-if="profiles.length" class="about-container">
        <ProfileSidebar :profile="profile" v-for="(profile, idx) in profiles" :key="idx"/>
    </div>
    <img v-else src="../assets/loading_icons/Rolling.gif" alt="Loading" />
  </section>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
export default {
  data() {
    return {
      profiles: []
    };
  },
  async created() {
    try {
      const orielsProfile = this.$store.dispatch({
        type: "getProfile",
        nickName: "orielshalem"
      });
      const ronsProfile = this.$store.dispatch({
        type: "getProfile",
        nickName: "ronavnery"
      });
      const stavsProfile = this.$store.dispatch({
        type: "getProfile",
        nickName: "StavDorkam119"
      });
      const profiles = await Promise.all([
        orielsProfile,
        stavsProfile,
        ronsProfile
      ]);
      this.profiles = profiles;
    } catch (err) {
      console.log("Error!", err);
    }
  },
  components: {
    ProfileSidebar
  }
};
</script>

<style scoped lang="scss">

section {
  position: relative;
  height: calc(100vh - 50px);
  & > img {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
}

.about-container {
  
  @include flexCustom(flex-start, center, row);
  & * {
    flex: 1;
  }
  & *:first-child {
    background: $tpBlue1;
  }
  & *:nth-child(2) {
    background: $tpLightPink;
  }
  & *:nth-child(3) {
    background: $tpBlue2;
  }
}

</style>
