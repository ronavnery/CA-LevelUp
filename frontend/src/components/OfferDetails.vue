<template>
  <section class="offer-details-container">
    <div class="offer-details-card" v-if="offer">
      
      <img class="img-main" :src="offer.imgs[0]" />
      <br />
      <span>{{offer.title}}</span>
      <br />
      <span>{{offer.description}}</span>
      <br />Requirements:
      <span
        v-for="requirement in offer.requirements"
        :key="requirement"
      >{{requirement}}</span>
      <br />
      <span>Stars:{{offer.stars}}</span>
      <br />Meeting Type:
      <span>{{offer.location.type}}</span>
      <br />Address:
      <span>{{offer.location.address}}</span>
      <br />Reviews:
      <span v-for="(review,idx) in offer.reviews" :key="idx">{{review}}</span>
      <br />
      <button class="btn-book" @click="toggleBooking">LevelUp!</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "OfferDetails",
  data() {
    return {
      offer: null
    };
  },
  async created() {
    const offerId = this.$route.params.offerId;
    if (offerId) {
      try {
        const offerToShow = await this.$store.dispatch({
          type: "getOfferById",
          offerId
        });
        console.log(offerToShow)
        this.getCurrOffer;
        console.log('curr offer is', this.offer)
      } catch (err) {
        console.log('theres an error',err);
      }
    }
  },
  computed: {
    getCurrOffer() {
      this.offer = this.$store.getters.getCurrOffer;
    }
  },
  methods: {
    toggleBooking() {
      this.$emit('toggle-booking')
    }
  }
};
</script>

<style scoped lang="scss">


.btn-book {
  @include btnActionGreySm;
}

.img-main {
  max-width: 300px;
}
</style>

