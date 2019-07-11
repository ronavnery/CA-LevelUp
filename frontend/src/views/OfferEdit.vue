<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'offer-edit',

  created() {
    offerId = this.route.params._id
    if (offerId) 
    this.edittedOffer = this.$store.dispatch({ type: "getOfferById", offerId })
    console.log(edittedOffer)
  },
  components: {

  }
}
</script>
