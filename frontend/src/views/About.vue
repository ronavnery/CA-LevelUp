<template>
  <section>
    <div v-if="profiles.length" class="about-container">
        <ProfileSidebar :profile="profile" v-for="(profile, idx) in profiles" :key="idx"/>
    </div>
    <breeding-rhombus-spinner class="loader" v-else
  :animation-duration="2000"
  :size="65"
  :color="'#c654dd'"
/>
  </section>
</template>

<script>
import ProfileSidebar from "../components/ProfileSidebar";
import 'epic-spinners/dist/lib/epic-spinners.min.css';
import {BreedingRhombusSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js';
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
        ronsProfile,
        stavsProfile
      ]);
      
      this.profiles = profiles;
    } catch (err) {
      console.log("Error!", err);
    }
  },
  components: {
    ProfileSidebar,
    BreedingRhombusSpinner
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
    left: 50%;
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

.loader {
position: absolute;
top: 40%;
left: 50%
}

</style>
