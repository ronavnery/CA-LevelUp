<template>
  <!-- <section class="offer-details-container" v-if="offer"> -->
    <div class="offer-card" v-if="offer">
      <aside>
        <img
          :src="offer.imgs[0]"
          alt="Chai Oatmeal"
        />

        <a href="#" class="button">
          <span class="icon icon-play" @click="toggleBooking"></span>
        </a>
      </aside>

      <article>
        <h2>{{offer.title}}</h2>
        <h3>{{offer.category}}</h3>

        <ul>
          <li>
            <span class="icon icon-users"></span>
            <span>1</span>
          </li>
          <li>
            <span class="icon icon-clock"></span>
            <span>{{offer.duration}}</span>
          </li>
          <li>
            <span class="icon icon-level"></span>
            <span>Beginner level</span>
          </li>
        </ul>

        <p>{{offer.description}}</p>

        <p class="ingredients">
          <span>Ingredients:&nbsp;</span>Milk, salt, coriander, cardamom, cinnamon, turmeric, honey, vanilla extract, regular oats, oat bran.
        </p>
      </article>
    </div>

          <!-- <li>
            <span class="icon icon-calories"></span>
            <span>{{offer.reviews.length}}</span>
          </li> -->

    <!-- <div class="details-main-info">
      <div class="main-info-top">
      <span class="fs32 strong">{{offer.title}}</span>
      <br />
      <span class="fs16">{{offer.description}}</span><br>
      <img class="img-main" :src="offer.imgs[0]" />
      </div>
    </div>
    <div class="details-secondary-info">
      <br />Requirements:
      <span
        v-for="requirement in offer.requirements"
        :key="requirement"
      >{{requirement}}</span>
      <br />
      <span>Stars:{{offer.stars}}</span>
      <br />Meeting Type:
      <span>{{offer.location.type}}</span>
      <br />Address:
      <span>{{offer.location.address}}</span>
      <br />Reviews:
      <span v-for="(review,idx) in offer.reviews" :key="idx">{{review}}</span>
      <br />
      <button class="btn-book" @click="toggleBooking">LevelUp!</button>
    </div>-->
  <!-- </section> -->
</template>

<script>
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
        console.log(offerToShow);
        this.getCurrOffer;
        console.log("curr offer is", this.offer);
      } catch (err) {
        console.log("theres an error", err);
      }
    }
  },
  computed: {
    getCurrOffer() {
      this.offer = this.$store.getters.getCurrOffer;
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
  height: rem(200px);
  object-fit:cover;
  vertical-align: bottom;
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
.offer-card aside {
  position: relative;
}
.offer-card aside img {
  // border-top-left-radius: 5px;
  // border-top-right-radius: 5px;
}
.offer-card aside .button {
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
.offer-card aside .button .icon {
  vertical-align: middle;
}
.offer-card article {
  padding: 1.25em 1.5em;
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
  color: #838689;
}
.offer-card article h2, .offer-card article h3 {
  margin: 0;
  font-weight: 300;
}
.offer-card article h2 {
  font-size: 1.75em;
  color: #222222;
}
.offer-card article h3 {
  font-size: 0.9375em;
  color: #838689;
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
.offer-card article .ingredients {
  margin: 2em 0 0.5em;
}
.offer-card .icon {
  display: inline;
  display: inline-block;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/recipe-card-icons.svg);
  background-repeat: no-repeat;
}
.offer-card .icon-calories, .offer-card .icon-calories\:regular {
  background-position: 0 0;
  width: 16px;
  height: 19px;
}
.offer-card .icon-clock, .offer-card .icon-clock\:regular {
  background-position: 0 -19px;
  width: 20px;
  height: 20px;
}
.offer-card .icon-level, .offer-card .icon-level\:regular {
  background-position: 0 -39px;
  width: 16px;
  height: 19px;
}
.offer-card .icon-play, .offer-card .icon-play\:regular {
  background-position: 0 -58px;
  width: 21px;
  height: 26px;
}
.offer-card .icon-users, .offer-card .icon-users\:regular {
  background-position: 0 -84px;
  width: 18px;
  height: 18px;
}







// .offer-details-container {
// }

// .btn-book {
//   @include btnActionGreySm;
// }

// .details-main-info {
//   min-width: 50%;
// }

// .details-main-info {
//   @include flexCustom(left, center, column);
// }

// .img-main {
//   max-width: rem(300px);
//   border-radius: rem(3px);
//   margin-top: rem(15px);
// }
</style>

