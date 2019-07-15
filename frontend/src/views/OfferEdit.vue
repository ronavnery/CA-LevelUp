<template>
  <div class="offer-edit">
    <form class="flex column">
      <h2>Add lesson</h2>
      <input
        type="text"
        id="title"
        v-model="editedOffer.title"
        
        placeholder="Title"
      />
      <vue-tags-input v-model="tag" :tags="tags" @tags-changed="tagChanged" />
      <input type="text" v-model="editedOffer.description" placeholder="Description" />
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

    <div v-for="(photo,idx) in optionalPhotos" :key="idx">
      <img :src="photo" alt @click="addPhoto(photo)" />
    </div>
    {{ tags }}
    {{ editedOffer }}
  </div>
</template>

<script>
// duration
// whats included
// category
// loction, if in person show possible location

// @ is an alias to /src

import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "offer-edit",
  data() {
    return {
      tag: "",
      tags: [],
      editedOffer: {
        tags: [],
        imgs: [],
        location: {
          type: "",
          address: ""
        }
      },
      optionalPhotos: []
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
        this.tags = offerToEdit.tags;
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
      const searchTerm = this.editedOffer.tags.join();
      try {
        const imgUrls = await this.$store.dispatch({
          type: "searchRelatedPhotos",
          searchTerm
        });
        this.optionalPhotos = imgUrls;
      } catch (err) {
        console.log(err);
      }
    },
    addPhoto(imgUrl) {
      const idx = this.editedOffer.imgs.findIndex(url => url === imgUrl);
      if (idx === -1) {
        this.editedOffer.imgs.push(imgUrl);
      } else {
        this.editedOffer.imgs.splice(idx, 1);
      }
    },
    tagChanged(newTags) {
      this.tags = newTags;
      this.editedOffer.tags = newTags.map(tag => tag.text);
      this.searchPhotos()
    }
  },

  components: {
    VueTagsInput
  }
};
</script>

<style lang="scss">
.offer-edit {
  @include flexCustom(center, center, column);
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

