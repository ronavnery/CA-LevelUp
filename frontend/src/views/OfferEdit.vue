<template>
  <div class="offer-edit">
    <form class="flex column">
      <h2>Add lesson</h2>
      <input type="text" id="title" v-model="edittedOffer.title" placeholder="Title" />
      <input type="text" v-model="edittedOffer.description" placeholder="Description" />
      <input type="text" v-model="edittedOffer.imgs" />
      <select name="meeting-type" id>
        <option value>Face to Face</option>
        <option value>Skype</option>
        <option value>ICQ</option>
      </select>
      <input type="text" placeholder="Add requirment" />
      <input type="text" v-model="edittedOffer.address" placeholder="Address" />
      <input @click.prevent="save" type="submit" />
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
        const offerToEdit = await this.$store.dispatch({
          type: "getOfferById",
          offerId
        });
        this.edittedOffer = offerToEdit;
      } catch (err) {
        console.log(err);
      }
    }
  },

  methods: {
    save() {
      console.log(this.edittedOffer);
      const newOffer = this.edittedOffer;
      if (newOffer._id) {
        this.$store.dispatch({ type: "updateOffer", newOffer });
      } else {
        this.$store.dispatch({ type: "addOffer", newOffer });
      }
    }
  },

  components: {}
};
</script>

<style lang="scss">
.offer-edit {
  text-align: center;
  display: flex;
  justify-content: center;
  form {
    width: 400px;
    & > * {
      margin: 6px;
      line-height: rem(40px);
      border: 1px;
      border-radius: 3px
    }
  }
}
</style>

