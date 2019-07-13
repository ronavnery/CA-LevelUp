<template>
  <section class="offer-details-container">
    <div class="offer-details-card">
      <img :src="offer.imgs[0]" /><br>
      <span>{{offer.title}}</span><br>
      <span>{{offer.description}}</span><br>
      Requirements:
      <span v-for="requirement in offer.requirements" :key="requirement">{{requirement}}</span><br>
      <span>Stars:{{offer.stars}}</span><br>
      Meeting Type: <span>{{offer.location.type}}</span><br>
      Address: <span>{{offer.location.address}}</span><br>
      Reviews: <span v-for="review in offer.reviews" :key="review">{{review}}</span><br>
      <button class="btn-book">Book to LevelUp!</button>
    </div>
  </section>
</template>

<script>
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
    offer() {
      return this.$store.getters.getCurrOffer;
    }
  }
};
</script>

<style scoped lang="scss">
.offer-details-card {
  height: 700px;
  // background: $tpWhite;
  // box-shadow: 0px 2px 5px 0px rgba(107,107,107,1);
  // border-radius: 3px;
}

.btn-book {
  @include btnActionSm;
  color: $tpGray3;
  border: 1px solid $tpGray3;
}
</style>

