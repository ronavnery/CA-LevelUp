<template>
  <div class="offer-details-container" v-if="offer">
    <header>
      <img :src="offer.imgs[0]" />
      <div class="show-all-overlay" @click="goToProfileOffers">
        <span class="show-all-text">Show all offers from this person</span>
      </div>
      <!-- <button  class="btn-show-all">Show all offers from this person</button> -->
      <button class="btn-toggle-booking" @click="toggleBooking">Book to level up!</button>
      <section class="header-overlay">
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
            <i class="header-icon fas fa-cogs"></i>
            <span class="header-icon-title">{{difficulty}}</span>
          </li>
          <li>
            <i class="header-icon fas fa-star" v-if="offer.ratingAvg"></i>
            <i class="header-icon far fa-star" v-else></i>
            <span class="header-icon-title">{{offer.ratingAvg | rating}}</span>
            <span
              class="header-icon-title"
              v-if="offer.ratingAvg"
            >({{offer.reviews.length}} reviews)</span>
          </li>
        </ul>
      </section>
    </header>

    <main class="offer-content" v-if="offer">
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
      <h4>Tags:</h4>
      <span v-for="(tag,idx) in offer.tags" :key="idx">
        {{tag}}
        <span v-if="idx !== offer.tags.length -1">,</span>
      </span>
    
    <ReviewEdit v-if="connectedUser" @add-review="addReviewToOffer"/>
    </main>
    <bookingLevelUp v-if="isBooking" @click="sendBookingReq" @close-booking-request="toggleBooking"/>
  </div>
</template>

<script>
import bookingLevelUp from "../components/bookingLevelUp";
import ReviewEdit from '../components/ReviewEdit';
import moment from "moment";
export default {
  name: "OfferDetails",
  data() {
    return {
      isBooking: false,
      offer: null,
      connectedUser: null
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
    this.connectedUser = this.$store.getters.connectedUser
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
    goToProfileOffers() {
      this.$router.push(`/profile/${this.offer.createdBy.nickName}/offers`);
    },
    toggleBooking() {
      this.isBooking = !this.isBooking;
    },
    sendBookingReq(bookingReq) {
      this.isBooking = false;
      bookingReq.offerId = this.offer._id;
      this.$store.dispatch({ type: "sendBookingReq", bookingReq });
    },
    async addReviewToOffer(review) {
      try {
        this.$store.dispatch({type: 'updateOfferWithNewReview', review, offer: this.offer})
      } catch(err) {
        console.log('error in adding review:', err)
      }
    }
  },
  components: {
    bookingLevelUp,
    ReviewEdit
  }
};
</script>





<style scoped lang="scss">
.btn-show-all {
  margin: rem(10px);
  @include btnActionWhiteSm;
  font-weight: normal;
  z-index: 1;
  position: absolute;
  right: 20px;
}

.show-all-overlay {
  cursor: pointer;
  font-weight: bold;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(61, 43, 97, 0.7);
  padding: 10px 10px 15px 30px;
  border-radius: 0 0 0 40px;
  .show-all-text {
    text-decoration: underline;
    color: white;
  }
}

img {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: bottom;
}

.header-overlay {
  position: absolute;
  top: 0;
  background: rgba(61, 43, 97, 0.7);
  border-radius: 0 0 70px;
  max-width: 70%;
  ul li span {
    color: black;
  }
  h2 {
    word-break: break-word;
  }
}

.category {
  bottom: 0;
}

.offer-details-container {
  position: relative;
  background: #fff;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
}

.offer-details-container header {
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

.offer-details-container header .button {
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
  bottom: 20px;
}

.offer-details-container .header-overlay {
  padding: 1em 2em 1em 1em;
}

.offer-details-container .header-overlay ul {
  list-style: none;
  margin: 0.5em 0 0;
  padding: 0;
}

.offer-details-container .header-overlay ul li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
  span {
    color: $tpWhite;
  }
}

.offer-details-container .header-overlay ul li:first-child {
  margin-left: 0;
}

.offer-details-container .header-overlay ul li .icon {
  vertical-align: bottom;
}

.offer-details-container .header-overlay ul li span:nth-of-type(2) {
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weight: 300;
  vertical-align: middle;
  color: $tpWhite;
}

.offer-details-container .header-overlay h2,
.offer-details-container .header-overlay h3 {
  margin: 0;
  font-weight: 300;
}

.offer-details-container .header-overlay h2 {
  font-size: 1.75em;
  color: $tpWhite;
  font-weight: bold;
}

.offer-details-container .header-overlay h3 {
  font-size: 0.9375em;
  color: $tpWhite;
}

.offer-details-container .header-overlay p {
  margin: 1.25em 0;
  font-size: 0.8125em;
  font-weight: 400;
  color: $tpBlack;
}

.offer-details-container .header-overlay p span {
  font-weight: 700;
  color: $tpBlack;
}

.offer-details-container {
  span {
    color: $tpBlack;
  }
}

main {
  padding: rem(20px);
  position: relative;
}
</style>

