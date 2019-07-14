<template>
  <div class="offer-edit">
    <form class="flex column">
      <h2>Add lesson</h2>
      <input
        type="text"
        id="title"
        v-model="editedOffer.title"
        @change="searchPhotos"
        placeholder="Title"
      />
      <input type="text" v-model="editedOffer.description" placeholder="Description" />
      <input type="text" v-model="editedOffer.imgs" placeholder="Image URL" />
      <select v-model="editedOffer.location.type" name="meeting-type">
        <option value="faceToFace">Face to Face</option>
        <option value="skype">Skype</option>
      </select>
      <input v-model="editedOffer.duration" placeholder="Duration in minuets" type="number" />
      <input v-model="editedOffer.whatsIncluded" type="text" placeholder="whats included" />
      <select v-model="editedOffer.category" name="category">
        <option value="sport">Sport</option>
        <option value="music">Music</option>
        <option value="art">Art</option>
        <option value="programing">Programing</option>
      </select>
      <input type="text" placeholder="Add requirment" />
      <input type="text" v-model="editedOffer.location.address" placeholder="Address" />
      <input @click.prevent="save" class="add-offer-btn" type="submit" />
    </form>
    <div v-if="isAvailablePhotos" >
      <div v-for="(photo,idx) in optionalPhotos" :key="idx">
        <img :src="photo" alt=""></div></div>
    {{ editedOffer }}
  </div>
</template>

<script>
// duration
// whats included
// category
// loction, if in person show possible location

// @ is an alias to /src

export default {
  name: "offer-edit",
  data() {
    return {
      editedOffer: {
        location: {
          type: "",
          address: ""
        }
      },
        optionalPhotos:[],
        isAvailablePhotos : false
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
        this.editedOffer = offerToEdit;
      } catch (err) {
        console.log(err);
      }
    }
  },

  methods: {
    save() {
      const newOffer = this.editedOffer;
      if (newOffer._id) {
        this.$store.dispatch({ type: "updateOffer", newOffer });
      } else {
        this.$store.dispatch({ type: "addOffer", newOffer });
      }
    },
    async searchPhotos() {
      const searchTerm = this.editedOffer.title
      try {
        const imgUrls = await this.$store.dispatch({ type: "searchRelatedPhotos", searchTerm})
        if(imgUrls) this.isAvailablePhotos = true
        this.optionalPhotos = imgUrls
      } catch (err) {
        console.log(err)
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
      height: rem(48px);
      padding: 0.75em;
      border: 1px solid #dfe0e6;
      background-color: #f2f2f2;
      border-radius: 2px;
    }
  }
  .add-offer-btn {
    width: 50%;
    place-self: center;
    @include btnActionColorSm;
  }
}
</style>

