<template>
  <div class="offer-details-container" v-if="offer">
    <header>
      <img :src="offer.imgs[0]" />
      <div class="show-all-overlay" @click="goToProfileOffers">
        <span class="show-all-text">Show all offers from this person</span>
      </div>
      <button v-if="!connectedUser || offer.createdBy._id !== connectedUser._id" class="btn-toggle-booking"  @click="toggleBooking">Book to level up!</button>
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
            <span class="header-icon-title">{{offer.rating.avgScore | rating}}</span>
            <span
              class="header-icon-title"
              v-if="offer.ratingAvg"
            >({{offer.rating.reviews.length}} reviews)</span>
          </li>
        </ul>
      </section>
    </header>
    <bookingLevelUp
      v-if="isBooking"
      @click="sendBookingReq"
      @close-booking-request="toggleBooking"
    />
    <main class="content-wrapper">
       <div class="grid-item" v-if="offer.requirements.length">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Requirements</h4>
        <ul>
          <li v-for="(item, idx) in offer.requirements" :key="idx">{{item}}</li>
        </ul>
      </div>
       <div class="grid-item not-included" v-else>
        <i class="fas fa-exclamation-triangle"></i>
        <h4>No Requirements Stated</h4>
      </div>
      <div class="grid-item">
        <i class="fas fa-info-circle"></i>
        <h4>Description</h4>
        <p>{{offer.description}}</p>
        
      </div>
     
      <div class="grid-item" v-if="offer.whatsIncluded.length">
        <i class="fas fa-box-open"></i>
        <h4>Whats Included</h4>
        <ul>
          <li v-for="(item, idx) in offer.whatsIncluded" :key="idx">{{item}}</li>
        </ul>
      </div>
      <div class="grid-item not-included" v-else>
        <i class="fas fa-box-open"></i>
        <h4>No Included Items Stated</h4>
      </div>
    </main>
    <section class="review-container">
      <ReviewList :reviews="offer.rating.reviews" v-if="offer.rating.reviews.length" />
      <h4 v-else>No Reviews Submitted At This Time</h4>
      <ReviewEdit class="review-edit" v-if="connectedUser" @add-review="addReviewToOffer" :status="reviewStatus"/>
    </section>
  </div>
</template>

<script>
import bookingLevelUp from "../components/bookingLevelUp";
import ReviewList from "@/components/ReviewList";
import ReviewEdit from "../components/ReviewEdit";

export default {
  name: "OfferDetails",
  data() {
    return {
      isBooking: false,
      offer: null,
      reviewStatus: ""
    };
  },
  async created() {
    const offerId = this.$route.params.offerId;
    if (offerId) {
      try {
        const offer = await this.$store.dispatch({
          type: "getOfferById",
          offerId
        });
        this.offer = offer;
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    difficulty() {
      if (this.offer.difficulty === 1) return "Beginner level";
      else if (this.offer.difficulty === 2) return "Intermediate level";
      else return "Advanced level";
    },
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
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
      this.reviewStatus = "submitting";
      try {
        await this.$store.dispatch({
          type: "updateOfferWithNewReview",
          review,
          offer: this.offer
        });
        this.reviewStatus = "success";
      } catch (err) {
        console.log("error in adding review:", err);
        this.reviewStatus = "error";
      }
    }
  },
  components: {
    bookingLevelUp,
    ReviewEdit,
    ReviewList
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
  &::-webkit-scrollbar {
    display: none;
  }
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
  left: 20px;
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

// main {
//   padding: rem(20px);
//   position: relative;
// }

// .review-edit {
//   margin-top: 50px;
// }

.content-wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  padding: 10px 5px;
  max-width: 1560px;
  margin: 0 auto;
  @media screen and (min-width: 560px) {
    padding: 10px 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 840px) {
    padding: 10px 25px;
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-item {
  padding: 10px 0;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  & > i {
    display: block;
    font-size: 2.3rem;
    margin: 0 auto 5px auto;
    text-align: center;
    color: #220f41;
    
  }

  h4 {
    font-family: $HanGroBlack;
    font-weight: 600;
  }
  ul {
    align-self: center;
    padding: 0;
    margin: 0;
  }

  li {
    text-align: start;
  }
  
}

.grid-item.not-included {
  color: #808080ba;
}

.review-container {
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  justify-content: space-between;
  margin: 0 auto;
  @media screen and (min-width: 560px) {
    padding: 10px 15px;
  }
  @media screen and (min-width: 840px) {
    padding: 10px 25px;
  }
}

</style>

