<template>
  <section class="offer-list">
    <OfferPreview
      v-for="(offer,idx) in offers"
      :key="idx"
      @removeOffer="removeOffer"
      :offer="offer"
    ></OfferPreview>
  </section>
</template>

<script>
import OfferPreview from "./OfferPreview";

export default {
  name: "OfferList",
  props: {
    offers: {
      type: Array
    }
  },
  methods: {
    removeOffer(offerId) {
      this.$emit("removeOffer", offerId);

    }
  },
  components: {
    OfferPreview
  }
};
</script>

<style>
</style>
