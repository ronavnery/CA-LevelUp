<template>
  <section class="profile-content-container">
    <button @click="showAll" class="btn-show-all">←Show all offers from this person</button>
    <div class="profile-content">
      <offer-details
        @toggle-booking="toggleBooking"
        :currOffer="getCurrOffer"
        v-if="isShowingOneOffer"
      />
      <!-- <div  v-for="(offer,idx) in userOffers" :key="idx">
        <OfferPreview v-if="!isShowingOneOffer" :offer="offer" />
      </div> -->
    </div>
  </section>
</template>

<script>
import OfferDetails from "../components/OfferDetails";
import OfferPreview from "../components/OfferPreview";
export default {
  name: "ProfileContent",
  data() {
    return {
      isShowingOneOffer: true,
      currUserName: "",
      userOffers: [],
      filter: {
        userName: ""
      }
    };
  },
  async created() {
    console.log(this.$route.params.userName);
    this.currUserName = this.$route.params.userName;
    this.filter.userName = this.currUserName;
    try {
      const userOffers = await this.$store.dispatch({
        type: "loadOffers",
        filter: this.filter
      });
      this.userOffers = userOffers;
      this.filter = null;
    } catch (err) {
      console.log(err);
    }
    const offerId = this.$route.params._id;
    if (!offerId) this.isShowingOneOffer = false;
  },
  computed: {
    getCurrOffer() {
      return this.$store.getters.getCurrOffer;
    }
  },
  methods: {
    showAll() {
      this.isShowingOneOffer = false;
      this.$router.push(`/profile/${this.currUserName}`);
    },
    toggleBooking() {
      this.$emit("toggle-booking");
    }
  },
  components: {
    OfferDetails,
    OfferPreview
  }
};
</script>

<style scoped lang="scss">
.profile-content-container {
  flex: 1;
}
.profile-content {
  flex: 1;
  padding: rem(80px);
  overflow: hidden;
}

.btn-show-all {
  margin: rem(30px) 0 0 rem(30px);
  @include btnActionGreySm;
}
</style>
