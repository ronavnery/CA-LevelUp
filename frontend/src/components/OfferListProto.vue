<template>
  <section class="offer-list-container">
    <masonry :cols="{default: 4, 1200: 3 , 1100: 2 ,900: 1}" :gutter="{default: '20px'}">
      <OfferPreview
        v-for="(offer,idx) in offers"
        :key="idx"
        @removeOffer="removeOffer"
        :offer="offer"
      ></OfferPreview>
    </masonry>
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

<style lang="scss">
.offer-list-container {
  @include flexCustom(space-around, center, row);
  flex-wrap: wrap;
  padding: 2rem 0;
}


</style>
