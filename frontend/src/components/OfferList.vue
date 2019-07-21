<template>
  <section class="offer-list-container" :class="{'list-on-profile': isShowingOnProfile} ">
    <masonry :cols="{default: 4 , 1080: 3, 830: 2, 500: 1}" :gutter="{default: '20px'}">
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
  },
  computed: {
    isShowingOnProfile() {
      if(this.$route.params.nickName) return true;
    }
  }
};
</script>

<style lang="scss">
.offer-list-container {
  @include flexCustom(space-around, center, row);
  flex-wrap: wrap;
  padding: 0 0 2rem;

  &div {
    width: auto;
  }
}

.list-on-profile {
  justify-content: flex-start;
  padding: 20px;
}

</style>
