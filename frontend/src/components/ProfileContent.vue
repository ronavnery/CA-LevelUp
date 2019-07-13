<template>
  <section class="profile-content-container">
      <button></button>
  <div class="profile-content">
    
    <offer-details :currOffer="getCurrOffer"/>
  </div>
  </section>
</template>

<script>
import OfferDetails from "../components/OfferDetails";
export default {
  name: "ProfileContent",
  created() {
          console.log('params', this.$route.params)
        //   const offerId = this.$route.params._id;
  },
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
