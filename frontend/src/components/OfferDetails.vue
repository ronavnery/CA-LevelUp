<template>
  <section class="offer-details-container">{{getCurrOffer}}</section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "OfferDetails",
  async created() {
    const offerId = this.$route.params._id;
    if (offerId) {
      try {
        const offerToShow = await this.$store.dispatch({
          type: "getOfferById",
          offerId
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    getCurrOffer() {
      return this.$store.getters.getCurrOffer
    }
  }
};
</script>

<style scoped lang="scss">
.offer-details-container {
  flex: 1;
}
</style>

