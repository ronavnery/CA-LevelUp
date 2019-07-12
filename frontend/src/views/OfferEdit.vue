<template>
  <div class="offer-edit">
    <form>
    <input type="text" v-model="edittedOffer.title">
    <input type="text" v-model="edittedOffer.description">
    <input type="text" v-model="edittedOffer.imgs">
    <input @click.prevent="save" type="submit">
    </form>
    {{ edittedOffer }}
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "offer-edit",
  data() {
    return {
      edittedOffer: {}
    };
  },

  async created() {
    const offerId = this.$route.params._id;
    if (offerId) {
      try {
        const offerToEdit = await this.$store.dispatch({type: "getOfferById", offerId});
        this.edittedOffer = offerToEdit
      } catch (err) {
        console.log(err);
      }
    }
  },

  methods: {
    save() {
      console.log(this.edittedOffer)
      const newOffer = this.edittedOffer
      if(newOffer._id){
        this.$store.dispatch({type: "updateOffer", newOffer});
      }else {
        this.$store.dispatch({type: "addOffer", newOffer});
      }
    }
  },

  components: {}
};
</script>
