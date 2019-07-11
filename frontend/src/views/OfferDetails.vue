<template>
  <div class="offer-details">
    <h1>ahalan</h1>
    {{offer}}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  created() {
    this.$store.dispatch({ type: "getOfferById", offerId: this.$route.params._id });

  },

  computed: {
    offer() {
      return this.$store.getters.getCurrOffer;
    }
  },
  components: {}
};
</script>
