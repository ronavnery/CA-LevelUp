<template>
  <section class="home-container">
    <section class="front">
      <span class="fs36">Get new skills for free in</span>
      <div class="changing-title fs36">
        <vue-typer
          class="typer"
          :text='["Development","Business","Finance & Accounting","IT & Software","Office Productivity","Personal Development","Design","Marketing","Photography","Health & Fitness","Music","Teaching & Academics"]'
          :repeat="Infinity"
          :shuffle="true"
          initial-action="typing"
          :pre-type-delay="70"
          :type-delay="70"
          :pre-erase-delay="2000"
          :erase-delay="50"
          erase-style="backspace"
          :erase-on-complete="false"
          caret-animation="solid"
        ></vue-typer>
      </div>
    </section>
    <div class="home-list fs20" v-if="!isLoading">
      <span class="strong">Recommended for you:</span>
      <OfferList v-if="recommendedOffers.length" :offers="recommendedOffers"></OfferList>
      <span class="strong">Newest in music:</span>
      <OfferList v-if="musicOffers.length" :offers="musicOffers"></OfferList>
      <span class="strong">Newest in Just For Fun:</span>
      <OfferList v-if="justForFunOffers.length" :offers="justForFunOffers"></OfferList>
      <span class="strong">Newest in DIY:</span>
      <OfferList v-if="diyOffers.length" :offers="diyOffers"></OfferList>
    </div>
    <div class="loading-container" v-else>
          <breeding-rhombus-spinner

      class="loader"
      :animation-duration="2000"
      :size="65"
      :color="'#c654dd'"
    />
    </div>

  </section>
</template>

<script>
import "epic-spinners/dist/lib/epic-spinners.min.css";
import { BreedingRhombusSpinner } from "epic-spinners/dist/lib/epic-spinners.min.js";
import OfferList from "../components/OfferList";
export default {
  name: "home",
  components: {
    OfferList,
    BreedingRhombusSpinner
  },
  data() {
    return {
      recommendedOffers: [],
      musicOffers: [],
      justForFunOffers: [],
      diyOffers: [],
      isLoading: true
    };
  },
  async mounted() { 
    let connectedUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
    connectedUser = (connectedUser)? connectedUser.nickName : 'visitor'
    const category = await this.$store.dispatch({
      type: "getUserPopularCategory",
      user: connectedUser
          });
    const recommendedOffers = this.$store.dispatch({
      type: "loadOffers",
      filter: { category, limit: 4 },
      noCommit: true
    });
    const musicOffers = this.$store.dispatch({
      type: "loadOffers",
      filter: { category: "music", limit: 4 },
      noCommit: true
    });
    const justForFunOffers = this.$store.dispatch({
      type: "loadOffers",
      filter: { category: "Just For Fun", limit: 4 },
      noCommit: true
    });
    const diyOffers = this.$store.dispatch({
      type: "loadOffers",
      filter: { category: "DIY", limit: 4 },
      noCommit: true
    });
    [this.recommendedOffers, this.musicOffers, this.justForFunOffers, this.diyOffers] = await Promise.all([recommendedOffers, musicOffers, justForFunOffers, diyOffers])
    this.isLoading = false;

  },

  methods: {
    setFilter(filter) {
      this.$router.push("/explore");
      this.$store.dispatch({ type: "loadOffers", filter });
    }
  }
};
</script>

<style scoped lang="scss">
.front {
  padding: 20px;
  height: calc(80vh - 50px);
  background-image: url("../assets/backgrounds/home-main-v2.jpg");
  @media screen and (max-width: 660px) {
    background-image: url("../assets/backgrounds/home-main-v2-media1.jpg")
  }
  background-size: cover;
  background-position: center;
  @include flexCustom(flex-start, center, column);
  .overlay {
    height: calc(100vh - 50px);
    background-color: $tpBlue1;
    opacity: 0.5;
  }
}

.front {
  color: white;
  text-align: center;
  &.vue-typer {
    color: white;
  }
}

.home-list {
  padding-top: 20px;
  max-width: 1080px;
  margin: 0 auto;

  @media screen and (max-width: 1080px) {
    padding: 20px;
  }
}

.loading-container {
  @include flexCenter(row);
  position: relative;
  top: 50px;
}
</style>

