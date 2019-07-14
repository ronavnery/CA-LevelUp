<template>
  <section class="profile-content-container">
      <button @click="showAll" class="btn-show-all">←Show all offers from this person</button>
  <div class="profile-content">
    <offer-details @toggle-booking="toggleBooking" :currOffer="getCurrOffer" v-if="isShowingOneOffer"/>

  </div>
  </section>
</template>

<script>
import OfferDetails from "../components/OfferDetails";
export default {
  name: "ProfileContent",
  data() {
      return {
          isShowingOneOffer: true,
          currUserName: ''
      }
  },
  created() {
          this.currUserName = this.$route.params.userName
          const offerId = this.$route.params._id;
          if (!offerId) this.isShowingOneOffer = false
  },
  computed: {
    getCurrOffer() {
      return this.$store.getters.getCurrOffer
    }
  },
  methods: {
      showAll() {
          this.isShowingOneOffer = false;
          this.$router.push(`/profile/${this.currUserName}`)
      },
      toggleBooking() {
      this.$emit('toggle-booking')
    }
  },
  components: {
    OfferDetails
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
    @include btnActionGreySm
}
</style>
