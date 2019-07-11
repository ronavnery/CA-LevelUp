<template>
  <div class="offer-edit">
    <input type="text" v-model="edittedOffer.title">
    <input type="text" v-model="edittedOffer.description">
    <input type="text" v-model="edittedOffer.imgs">
    {{ edittedOffer }}
    </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: "offer-edit",
  data() {
    return {
      edittedOffer: {}
    };
  },

  // need To update after backend
  async created() {
    const offerId = this.$route.params._id;
    if (offerId) {
      try {
        const offerToEdit = await this.$store.dispatch({
          type: "getOfferById",
          offerId
        });
        this.edittedOffer = this.$store.getters.getCurrOffer;
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(edittedOffer)
  },
  components: {}
};
</script>
