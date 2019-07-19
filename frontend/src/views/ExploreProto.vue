<template>
  <section class="explore-main-container">
    <!-- <offer-filter @set-filter="setFilter"></offer-filter>
    <img v-if="!offers" src="../img/loading.svg" width="100" alt=""> -->
    <OfferFilter @filter-offers="setFilter"/>
    <!-- <OfferPreview /> -->
    <OfferList :offers="offers" @removeOffer="removeOffer"></OfferList>
  </section>
</template>
<script>

import OfferList from "../components/OfferList";
import OfferPreview from '@/components/OfferPreview.vue';
import OfferFilter from '@/components/OfferFilter.vue';

export default {
  name: "Explore",
  
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
        this.$store.dispatch({ type: "removeOffer", offerId})
        },
        setFilter(filter) {
            this.$store.dispatch({ type: "loadOffers", filter });
        }
  },

  components: {
    OfferList,
    OfferPreview,
    OfferFilter
  }
};
</script>
<style>
</style>
