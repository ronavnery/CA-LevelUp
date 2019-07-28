<template>
  <section class="offer-list-container" :class="{'list-on-profile': isShowingOnProfile} ">
    <masonry :cols="colConfig" :gutter="{default: '20px'}" v-if="offers.length">
      <OfferPreview
        v-for="(offer,idx) in offers"
        :key="idx"
        @removeOffer="removeOffer"
        @offerClicked="emitOfferClick"
        :offer="offer"
        :currMarkedOfferId="currMarkedOfferId"
      ></OfferPreview>
    </masonry>
    <span v-else-if="(offers.length === 0)">No offers to show</span>
    <breeding-rhombus-spinner
      v-else
      :class="listOnProfile"
      :animation-duration="2000"
      :size="65"
      :color="'#c654dd'"
    />
  </section>
</template>

<script>
import OfferPreview from "./OfferPreview";
import "epic-spinners/dist/lib/epic-spinners.min.css";
import { BreedingRhombusSpinner } from "epic-spinners/dist/lib/epic-spinners.min.js";
export default {
  name: "OfferList",
  props: {
    offers: {
      type: Array
    },
    cols: {
      type: Number
    },
    currMarkedOfferId: {
      type: String
    }
  },
  methods: {
    removeOffer(offerId) {
      this.$emit("removeOffer", offerId);
    },
    emitOfferClick(offer) {
      this.$emit("offerClicked", offer);
    }
  },
  components: {
    OfferPreview,
    BreedingRhombusSpinner
  },
  computed: {
    isShowingOnProfile() {
      if (this.$route.params.nickName) return true;
    },
    colConfig() {
      return this.cols
        ? { default: this.cols }
        : { default: 4, 1080: 3, 830: 2, 500: 1 };
    },
    listOnProfile() {
      return this.$route.params.nickName ? "profile" : "explore";
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

.profile {
  position: relative;
  left: 50%;
}

.explore {
  position: relative;
  top: 60px;
}
</style>
