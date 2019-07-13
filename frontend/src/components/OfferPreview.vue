<template>
  <section @click="goToDetails" class="offer-preview">
    {{offer}}
    <button @click.stop="removeOffer">Remove</button>
    <button @click.stop="goToEdit">Edit</button>
  </section>
</template>

<script>
export default {
  name: 'OfferPreview',
  props: {
    offer: {
      type: Object
    }
  },
  methods: {
    goToDetails() {
      this.$router.push(`profile/${this.offer.createdBy.userName}/${this.offer._id}`)
      this.$store.commit({type: 'setCurrProfile', userId: this.offer.createdBy._id})
      
      this.$store.dispatch({type: 'getOfferById', userId: this.offer.createdBy._id})
    },
    goToEdit() {
      this.$router.push(`explore/edit/${this.offer._id}`)
    },
    removeOffer(){
      this.$emit('removeOffer', this.offer._id)
    }
  }
};
</script>

<style>

</style>
