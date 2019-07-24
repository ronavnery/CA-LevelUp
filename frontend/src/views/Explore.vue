<template>
  <section class="explore-main-container">
    <header class="cover">
      <span class="fs32">Which new skill are you looking for?</span>
      <span>{{offers.length}} skills to choose from</span>
      <Offer-Filter @filter-offers="setFilter" ref="entry" class="filter-section" />
    </header>
    <div class="explore-list-container">
    <OfferList v-if="offers.length" :offers="offers" @removeOffer="removeOffer"></OfferList>
    </div>
  </section>
</template>
<script>
import OfferList from "../components/OfferList";
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
    OfferFilter
  }
};
</script>

<style lang="scss" scoped>
.cover {
  // background-color: #3d2b61;
  background-image: url("../assets/backgrounds/explore-cover.jpg");
  background-size: cover;
  color: white;
  text-align: center;
  font-family: $HanGroBlack;
  min-height: 200px;
  max-height: max-content;
  padding: 20px;
  @include flexCustom(space-between, center, column);

  span {
    color: #ffffffbd;
  }

}

.explore-list-container {
  // padding-top: 20px;
  max-width: 1080px;
  margin: 0 auto;

  @media screen and (max-width: 1080px) {
    padding: 20px;
  }
}
</style>

