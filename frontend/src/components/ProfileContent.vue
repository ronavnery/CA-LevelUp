<template>
  <section class="profile-content-container">
    <button @click="showAll" class="btn-show-all">←Show all offers from this person</button>
    <div class="profile-content">
      <offer-details
        @toggle-booking="toggleBooking"
        :currOffer="getCurrOffer"
        v-if="isShowingOneOffer"
      />
      <div v-else v-for="(offer,idx) in userOffers" :key="idx" @click="previewClicked">
        <OfferPreview :offer="offer" />
      </div>
    </div>
  </section>
</template>

<script>
import OfferDetails from "../components/OfferDetails";
import OfferPreview from "../components/OfferPreview";
export default {
  name: "ProfileContent",
  props: {
    currOffer: {
      type: Object
    }
  },
  data() {
    return {
      isShowingOneOffer: null,
      currUserName: "",
      userOffers: [],
      filter: {
        userName: ""
      }
    };
  },
  async created() {
    this.$route.params.offerId
      ? (this.isShowingOneOffer = true)
      : (this.isShowingOneOffer = false);
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
    const offerId = this.$route.params.offerId;
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
    previewClicked() {
      this.isShowingOneOffer = true;
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
  display: flex;
  padding: rem(40px);
  overflow: hidden;
}

.profile-content > :first-child {
  margin-right: rem(30px)
}


.btn-show-all {
  margin: rem(30px) 0 0 rem(30px);
  @include btnActionGreySm;
}
</style>
