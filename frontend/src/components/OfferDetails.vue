<template>
  <!-- <section class="offer-details-container" v-if="offer"> -->
  <div class="offer-card" v-if="offer">
    <header>
      <img :src="offer.imgs[0]" />

      <article>
        <h2>{{offer.title}}</h2>
        <h3 class="category">{{offer.category}}</h3>

        <ul>
          <li>
            <i class="header-icon fas fa-user-friends" v-if="offer.minPeople > 1 "></i>
            <i class="header-icon fas fa-user-alt" v-else></i>
            <span class="header-icon-title">{{offer.minPeople}}</span>
          </li>
          <li>
            <i class="header-icon far fa-clock"></i>
            <span class="header-icon-title">{{offer.duration | durationInMins}}</span>
          </li>
          <li>
            <i class="header-icon fas fa-dice-one" v-if="offer.difficulty === 1"></i>
            <i class="header-icon fas fa-dice-two" v-if="offer.difficulty === 2"></i>
            <i class="header-icon fas fa-dice-three" v-if="offer.difficulty === 3"></i>
            <span class="header-icon-title">{{difficulty}}</span>
          </li>
          <li>
            <i class="header-icon fas fa-star" v-if="offer.ratingAvg"></i>
            <i class="header-icon far fa-star" v-else></i>
            <span class="header-icon-title">{{offer.ratingAvg | rating}}/5</span>
            <span class="header-icon-title" v-if="offer.ratingAvg">({{offer.reviews.length}} reviews)</span>
          </li>
        </ul>
      </article>
    </header>
    <main v-if="offer">
      <button class="btn-toggle-booking" @click="toggleBooking">Book to level up!</button>
      <h4>Requirements:</h4>
      <ul>
        <li v-for="requirement in offer.requirements" :key="requirement">{{requirement}}</li>
      </ul>
      <h4 v-if="offer.whatsIncluded.length">Whats included:</h4>
      <ul>
        <li v-for="included in offer.whatsIncluded" :key="included">{{included}}</li>
      </ul>
      <h4>Description:</h4>
      <p>{{offer.description}}</p>
    </main>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "OfferDetails",
  data() {
    return {
      offer: null
    };
  },
  async created() {
    const offerId = this.$route.params.offerId;
    if (offerId) {
      try {
        const offerToShow = await this.$store.dispatch({
          type: "getOfferById",
          offerId
        });
        this.getCurrOffer;
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    getCurrOffer() {
      this.offer = this.$store.getters.getCurrOffer;
    },
    difficulty() {
      if (this.offer.difficulty === 1) return "Beginner level";
      else if (this.offer.difficulty === 2) return "Intermediate level";
      else return "Advanced level";
    }
  },
  methods: {
    toggleBooking() {
      this.$emit("toggle-booking");
    }
  }
};
</script>

<style scoped lang="scss">
img {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: bottom;
}

article {
  position: absolute;
  top: 0;
  background: rgba(61, 43, 97, 0.7);
  border-radius: 0 0 70px;
}

.category {
  bottom: 0;
}

.offer-card {
  background: #fff;
  // margin: 4em auto;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  // max-width: 496px;
  // border-top-left-radius: 5px;
  // border-top-right-radius: 5px;
  // border-bottom-left-radius: 5px;
  // border-bottom-right-radius: 5px;
}

.offer-card header {
  height: 400px;
  position: relative;
}

.header-icon {
  color: $tpLightPink;
}

.header-icon-title {
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weight: 300;
  vertical-align: middle;
  color: #fff;
}

.offer-card header .button {
  background: $tpPink;
  display: inline-block;
  position: absolute;
  top: 80%;
  right: 3%;
  width: 4.0625em;
  height: 4.0625em;
  border-radius: 4.0625em;
  line-height: 4.0625em;
  text-align: center;
}
.btn-toggle-booking {
  @include btnActionColor();
  position: absolute;
  right: 20px;
  top: 20px;
}
.offer-card article {
  padding: 1em 2em 1em 1em;
}
.offer-card article ul {
  list-style: none;
  margin: 0.5em 0 0;
  padding: 0;
}
.offer-card article ul li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}
.offer-card article ul li:first-child {
  margin-left: 0;
}
.offer-card article ul li .icon {
  vertical-align: bottom;
}
.offer-card article ul li span:nth-of-type(2) {
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weight: 300;
  vertical-align: middle;
  color: $tpWhite;
}

.offer-card article h2,
.offer-card article h3 {
  margin: 0;
  font-weight: 300;
}
.offer-card article h2 {
  font-size: 1.75em;
  color: $tpWhite;
  font-weight: bold;
  max-width: 70%;
}
.offer-card article h3 {
  font-size: 0.9375em;
  color: $tpWhite;
}
.offer-card article p {
  margin: 1.25em 0;
  font-size: 0.8125em;
  font-weight: 400;
  color: #222222;
}
.offer-card article p span {
  font-weight: 700;
  color: #000000;
}

.offer-card .icon {
  display: inline;
  display: inline-block;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/recipe-card-icons.svg);
  background-repeat: no-repeat;
}

.offer-card {
  span {
    color: $tpWhite;
  }
}
.offer-card .icon-calories,
.offer-card .icon-calories\:regular {
  background-position: 0 0;
  width: 16px;
  height: 19px;
}
.offer-card .icon-clock,
.offer-card .icon-clock\:regular {
  background-position: 0 -19px;
  width: 20px;
  height: 20px;
}
.offer-card .icon-level,
.offer-card .icon-level\:regular {
  background-position: 0 -39px;
  width: 16px;
  height: 19px;
}
.offer-card .icon-play,
.offer-card .icon-play\:regular {
  background-position: 0 -58px;
  width: 21px;
  height: 26px;
}
.offer-card .icon-users,
.offer-card .icon-users\:regular {
  background-position: 0 -84px;
  width: 18px;
  height: 18px;
}

main {
  padding: rem(20px);
  position: relative;
}
</style>

