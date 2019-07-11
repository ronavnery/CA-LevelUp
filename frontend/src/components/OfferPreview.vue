<template>
  <section @click="goToDetails" class="offer-preview">
    {{offer}}
    <button @click.stop="removeOffer">remove</button>
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
      this.$router.push(`explore/${this.offer._id}`)
    },
    removeOffer(){
      this.$emit('removeOffer', this.offer._id)
    }
  }
};
</script>

<style>

</style>
