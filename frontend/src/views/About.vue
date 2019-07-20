<template>
  <div class="about-container">
    <ProfileSidebar :profile="ronsProfile" v-if="ronsProfile"/>
    <ProfileSidebar :profile="stavsProfile" v-if="stavsProfile"/>
    <ProfileSidebar :profile="orielsProfile" v-if="orielsProfile"/>
  </div>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
export default {
  data() {
    return {
      ronsProfile: null,
      stavsProfile: null,
      orielsProfile: null
    };
  },
  async created() {
    try {
      let profile = await this.$store.dispatch({
        type: "getProfile",
        nickName: 'ronavnery'
      });
      this.ronsProfile = profile;
      console.log('rons profile:', this.ronsProfile);
      profile = await this.$store.dispatch({
        type: "getProfile",
        nickName: 'StavDorkam119'
      });
      this.stavsProfile = profile;
      console.log('stavs profile:', this.stavsProfile);

      profile = await this.$store.dispatch({
        type: "getProfile",
        nickName: 'orielshalem'
      });
      this.orielsProfile = profile;
      console.log('oriels profile:', this.orielsProfile);

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

.about-container {
  height: calc(100vh - 50px);
  @include flexCenter(row)
  & >* {
    flex: 1;
  }
  & > *:first-child {
    background: $tpBlue1;
  }
  & > *:nth-child(2) {
    background: $tpLightPink;
  }
  & > *:nth-child(3) {
    background: $tpBlue2;
  }
}
</style>
