<template>
  <div class="offer-edit">
    <form @submit.prevent="console.log('hi')" class="flex column">
      <h2>Add lesson</h2>
      <input type="text" v-model="editedOffer.title" placeholder="Title" />
      <input type="text" v-model="editedOffer.description" placeholder="Description" />
      <vue-tags-input v-model="tag" :tags="tags" @tags-changed="tagChanged" />
      <select v-model="editedOffer.category" name="category">
        <option v-for="(category,idx) in optionalCategorys" :key="idx">{{category}}</option>
      </select>
      <select v-model.number="editedOffer.difficulty" name="difficulty">
        <option v-for="(difficult,idx) in 3" :key="idx">{{difficult}}</option>
      </select>
      <input v-model.number="editedOffer.duration" placeholder="Duration in minuets" type="number" />
      <DynamicList @requirements-updated="changeRequirments"  :list ="editedOffer.requirements"/>
      <DynamicList @whatIncluded-updated="changeWhatsIncluded" :list ="editedOffer.whatsIncluded" />
      <input
        v-model.number="editedOffer.minPeople"
        placeholder="Min participate peoples"
        type="number"
      />
      <input type="text" v-model="editedOffer.location.address" placeholder="Address" />
      <select v-model="editedOffer.location.type">
        <option>Skype</option>
        <option>In Person</option>
      </select>
    <DynamicCarousel :imgs="this.optionalPhotos" @img-choosed="addPhoto" />
      <input @click.prevent="save" class="add-offer-btn" type="submit" />
    </form>
    <!-- <DynamicList @requirements-updated="changeRequirments" />
    <DynamicList @whatIncluded-updated="changeWhatsIncluded" />-->
    <!-- <div v-for="(photo,idx) in optionalPhotos" :key="idx">
      <img :src="photo" alt @click="addPhoto(photo)" />
    </div> -->
    {{ tags }}
    {{ editedOffer }}
  </div>
</template>

<script>
import DynamicList from "../components/DynamicList";
import VueTagsInput from "@johmun/vue-tags-input";
import DynamicCarousel from '../components/DynamicCarousel'


export default {
  name: "offer-edit",
  data() {
    return {
      tag: "",
      tags: [],
      optionalPhotos: [],
      optionalCategorys: [
        "Development",
        "Business",
        "Finance & Accounting",
        "IT & Software",
        "Office Productivity",
        "Personal Development",
        "Design",
        "Marketing",
        "Lifestyle",
        "Photography",
        "Health & Fitness",
        "Music",
        "Teaching & Academics"
      ],
      editedOffer: {
        title: "",
        description: "",
        imgs: [],
        tags: [],
        requirements: [],
        duration: "",
        category: "Development",
        difficulty: 1,
        minPeople: "",
        ratingAvg: 0,
        whatsIncluded: [],
        interested: [],
        reviews: [],
        leveledUp: [],
        location: {
          type: "In Person",
          address: ""
        }
      }
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
        if (!this.$store.getters.connectedUser) this.$router.push("/");
        this.searchPhotos();
        this.editedOffer = offerToEdit;
        this.tags = offerToEdit.tags.map(tag => tag = {text: tag});
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
      const searchTerm = this.editedOffer.tags.join(" ");
      try {
        const imgUrls = await this.$store.dispatch({
          type: "searchRelatedPhotos",
          searchTerm
        });
        console.log(imgUrls)
        this.optionalPhotos = imgUrls;
      } catch (err) {
        console.log(err);
      }
    },

    changeRequirments(newRequirments) {
      // console.log(newRequirments)
      this.editedOffer.requirements = newRequirments;
    },
    changeWhatsIncluded(newIncludes) {
      this.editedOffer.whatsIncluded = newIncludes;
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
      this.searchPhotos();
    }
  },

  components: {
    VueTagsInput,
    DynamicList,
    DynamicCarousel
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
      // height: rem(48px);
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

