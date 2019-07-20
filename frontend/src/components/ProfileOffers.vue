<template>
  <section class="profile-offers-container" v-if="profileOffers">
        <span class="title fs24 strong">{{this.$store.getters.currProfile.name}}'s offers:</span>
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

<style scoped lang="scss">

.title {
  margin-left: 20px;
}
.profile-offers-container {
  padding: 20px;
  overflow: auto;
  height: 100%;
}
</style>


