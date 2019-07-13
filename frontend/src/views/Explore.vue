<template>
  <section class="explore-main-container">
    <!-- <offer-filter @set-filter="setFilter"></offer-filter>
    <img v-if="!offers" src="../img/loading.svg" width="100" alt=""> -->
    <button @click="addOffer">Add offer</button>
    <OfferList :offers="offers" @removeOffer="removeOffer"></OfferList>
    <!-- {{offers}} -->
  </section>
</template>
<script>

import OfferList from "../components/OfferList";

export default {
  name: "Explore",

  data() {
    return {
      filter: {}
    };
  },
  computed: {
    offers() {
      return this.$store.getters.getOffers;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadOffers", filter: this.filter });
  },
  
  methods: {
        removeOffer(offerId) {
        this.$store.dispatch({ type: "removeOffer", offerId})
        },
        addOffer() {
          this.$router.push('/explore/edit')
        }
  },

  components: {
    OfferList
  }
};
</script>
<style>
</style>
