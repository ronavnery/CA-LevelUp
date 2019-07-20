<template>
  <section class="explore-main-container">
    <header class="cover">
      <span class="fs32">Learn Your New Skill</span>
      <span>{{offers.length}} skills to choose from</span>
      <Offer-Filter @filter-offers="setFilter" ref="entry" class="filter-section" />
    </header>
    <OfferList v-if="offers.length" :offers="offers" @removeOffer="removeOffer"></OfferList>
  </section>
</template>
<script>
import OfferList from "../components/OfferList";
import OfferPreview from "@/components/OfferPreview.vue";
import OfferFilter from "@/components/OfferFilter.vue";

export default {
  name: "Explore",

  updated() {
    // window.addEventListener('scroll', this.callback)
  },

  data() {
    return {
      observer: null
    };
  },

  computed: {
    offers() {
      return this.$store.getters.getOffers;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadOffers", filter: {} });
  },

  methods: {
    removeOffer(offerId) {
      this.$store.dispatch({ type: "removeOffer", offerId });
    },
    setFilter(filter) {
      this.$store.dispatch({ type: "loadOffers", filter });
    }
    // callback() {
    //   const filterEl = this.$refs.entry.$el
    //   if (window.pageYOffset >= filterEl.offsetTop) {
    //     filterEl.style.position = 'sticky';
    //     filterEl.style.top = 0;
    //   } else {
    //     filterEl.style.position = 'relative';
    //     filterEl.style.top = -25 + 'px';
    //   }
    // }
  },

  components: {
    OfferList,
    OfferPreview,
    OfferFilter
  }
};
</script>

<style lang="scss" scoped>
.cover {
  background-color: #3d2b61;
  color: white;
  text-align: center;
  font-family: $HanGroBlack;
  height: 200px;
  padding: 20px;

  @include flexCustom(space-between, center, column);

  span {
    color: #ffffffbd;
  }
}
</style>

