<template>
  <section v-if="profileOffers">
        <OfferList :offers="profileOffers" @removeOffer="removeOffer"></OfferList>
  </section>
</template>

<script>
import OfferList from "../components/OfferList";
export default {
  name: "ProfileOffers",
  data() {
    return {
      profileNickName: "",
      profileOffers: [],
      filter: {
        nickName: ""
      }
    };
  },
  async created() {
        this.profileNickName = this.$route.params.nickName;
        this.filter.nickName = this.profileNickName;
        try {
          const profileOffers = await this.$store.dispatch({
            type: "loadOffers",
            filter: this.filter
          });
          this.profileOffers = profileOffers;
          this.filter = null;
        } catch (err) {
          console.log(err);
        }
  },
    methods: {
        removeOffer(offerId) {
        this.$store.dispatch({ type: "removeOffer", offerId})
        },
  },
  components: {
      OfferList
  }
};
</script>

