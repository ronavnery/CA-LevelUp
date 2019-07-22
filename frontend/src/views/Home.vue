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
    <div class="home-list fs20">
      <span class="strong">Recommended for you:</span>
      <OfferList v-if="recommendedOffers.length" :offers="recommendedOffers"></OfferList>
      <span class="strong">Newest in music:</span>
      <OfferList v-if="musicOffers.length" :offers="musicOffers"></OfferList>
    </div>
  </section>
</template>

<script>
import OfferFilter from "@/components/OfferFilter.vue";
import OfferList from "../components/OfferList";
export default {
  name: "home",
  components: {
    OfferFilter,
    OfferList
  },
  data() {
    return {
      recommendedOffers: [],
      musicOffers: [],

    };
  },
  computed: {
    offers() {
      return this.$store.getters.getOffers;
    },

  },
  async mounted() {
    let connectedUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
    connectedUser = (connectedUser)? connectedUser.nickName : 'visitor'
    const category = await this.$store.dispatch({
      type: "getUserPopularCategory",
      user: connectedUser
          });
    this.recommendedOffers = await this.$store.dispatch({
      type: "loadOffers",
      filter: { category, limit: 4 }
    });
    this.musicOffers = await this.$store.dispatch({
      type: "loadOffers",
      filter: { category: "music", limit: 4 }
    });
    // TODOS: get more categories
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
</style>

