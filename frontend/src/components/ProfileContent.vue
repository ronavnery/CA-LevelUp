<template>
  <div class="profile-content">
    <offer-details :currOffer="getCurrOffer"/>
  </div>
</template>

<script>
import OfferDetails from "../components/OfferDetails";
export default {
  name: "ProfileContent",
  computed: {
    getCurrOffer() {
      return this.$store.getters.getCurrOffer
    }
  },
  components: {
    OfferDetails
  }
};
</script>

<style scoped lang="scss">
.profile-content {
  flex: 1;
  padding: rem(80px);
  overflow: hidden;
}
</style>
