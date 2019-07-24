<template>
  <div class="offer-edit">
    <!-- <ProfileSidebar class="profile-sidebar" :profile="connectedUser" /> -->
    <section class="edit-container">
      <span class="fs22 strong">Share a new skill</span>
      <form v-on:submit.prevent>
        <section class="settings-first">
          <span class="tags-title fs14">Choose a category</span>
          <!-- CATEGORY -->
          <select
            v-model="editedOffer.category"
            name="category"
            class="form-control category"
            required
          >
            <option v-for="(category,idx) in optionalCategories" :key="idx">{{category}}</option>
          </select>

          <!-- SESSION TYPE -->
          <span class="tags-title fs14">Choose the session type</span>
          <select v-model="editedOffer.type" class="session-type form-control">
            <option>In Person</option>
            <option>Voice/Video Chat</option>
          </select>

          <!-- SINGLE OR GROUP -->
          <div class="single-group-container fs14" v-if="editedOffer.type === 'In Person'">
            <div class="tags-title fs14">Is it for 1 preson or more?</div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                name="radioInline1"
                class="custom-control-input"
                id="singleOrGroup1"
                :value="false"
                v-model.number="editedOffer.isGroup"
              />
              <label class="custom-control-label" for="singleOrGroup1">1 on 1</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                name="radioInline1"
                class="custom-control-input"
                id="singleOrGroup2"
                :value="true"
                v-model.number="editedOffer.isGroup"
              />
              <label class="custom-control-label" for="singleOrGroup2">Group</label>
            </div>
          </div>

          <!-- ADDRESS -->
          <!-- v-if="editedOffer.type === 'In Person'" -->
          <gmap-autocomplete @place_changed="setPlace" @keydown.enter.prevent class="form-control"></gmap-autocomplete>

          <!-- TITLE -->
          <input
            v-model="editedOffer.title"
            type="text"
            placeholder="Title"
            class="title-input form-control"
            @keydown.enter.prevent
          />

          <!-- DESCRIPTION -->
          <textarea
            v-model="editedOffer.description"
            placeholder="Description"
            rows="5"
            class="desc-input form-control"
          />

          <!-- DIFFICULTY -->
          <span class="fs14">Skill difficulty</span>
          <div class="difficulty-container fs14">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                name="radioInline2"
                class="custom-control-input"
                id="defaultInline1"
                value="1"
                v-model.number="editedOffer.difficulty"
              />
              <label class="custom-control-label" for="defaultInline1">Beginner</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                name="radioInline2"
                class="custom-control-input"
                id="defaultInline2"
                value="2"
                v-model.number="editedOffer.difficulty"
              />
              <label class="custom-control-label" for="defaultInline2">Intermediate</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                name="radioInline2"
                class="custom-control-input"
                id="defaultInline3"
                value="3"
                v-model.number="editedOffer.difficulty"
              />
              <label class="custom-control-label" for="defaultInline3">Advanced</label>
            </div>
          </div>

          <!-- SESSION DURATION -->
          <div>
            <div class="duration-container">
              <span class="tags-title fs14">How long will the session be? (in minutes)</span>
              <!-- <circle-slider
              v-model="editedOffer.duration"
              @touchmove="$refs.input.blur()"
              circle-color="#cecece"
              progress-color="#a0a0ff"
              knob-color="#4e36dd"
              :min="5"
              :max="360"
              :step-size="5"
              ></circle-slider>-->

              <input
                v-model.number="editedOffer.duration"
                placeholder
                type="number"
                class="form-control"
              />
            </div>
          </div>
        </section>

        <!-- RIGHT SIDE -->
        <section class="settings-second">
          <!-- REQUIREMENTS -->
          <span class="tags-title fs14">Are there any previous requirements for this skill?</span>
          <DynamicList @requirements-updated="changeRequirments" :list="editedOffer.requirements" />
          <span class="tags-title fs14">Whats included in this session?</span>
          <!-- WHATS INCLUDED -->
          <DynamicList
            @whatIncluded-updated="changeWhatsIncluded"
            :list="editedOffer.whatsIncluded"
          />
          <!-- MIN PEOPLE -->
          <input
            class="form-control"
            v-model.number="editedOffer.minPeople"
            placeholder="Min participants"
            type="number"
            @keydown.enter.prevent
          />

          <!-- TAGS -->
          <span class="tags-title fs14">Add tags so peope can easily find your skill</span>
          <vue-tags-input
            class="form-control"
            v-model="tag"
            :tags="tags"
            @tags-changed="tagChanged"
          />

          <span class="tags-title fs14">Cover image url</span>
          <input
            class="form-control"
            type="text"
            v-model="editedOffer.imgs[0]"
            placeholder="Image URL"
            @keydown.enter.prevent
          />
          <!-- CAROUSEL -->
          <span
            class="fs14"
            v-if="this.optionalPhotos.length > 0"
          >Choose some photos that best suit your offer:</span>
          <DynamicCarousel
            class="dynamic-carousel"
            :imgs="this.optionalPhotos"
            @img-choosed="addPhoto"
          />

          <button @click.prevent="save" class="add-offer-btn" type="submit">Share!</button>
        </section>
      </form>
    </section>
  </div>
</template>

<script>
import DynamicList from "../components/DynamicList";
import VueTagsInput from "@johmun/vue-tags-input";
import DynamicCarousel from "../components/DynamicCarousel";

export default {
  name: "offer-edit",
  data() {
    return {
      tag: "",
      tags: [],
      optionalPhotos: [],
      optionalCategories: [
        "Just For Fun",
        "Development",
        "Business",
        "Finance & Accounting",
        "IT & Software",
        "Office Productivity",
        "DIY",
        "Personal Development",
        "Design",
        "Marketing",
        "Lifestyle",
        "Photography",
        "Health & Fitness",
        "Music",
        "Teaching & Academics"
      ],
      optionalDifficulties: [
        "Beginner level",
        "Intermediate level",
        "Advanced level"
      ],
      editedOffer: {
        title: "",
        description: "",
        imgs: [],
        tags: [],
        requirements: [],
        isGroup: true,
        type: 'In Person',
        duration: "",
        category: "Just For Fun",
        difficulty: 1,
        minPeople: "",
        whatsIncluded: [],
        interested: [],
        leveledUp: [],
        createdBy: null,
        location: {
          address: ""
        },
        rating: {
          avgScore: 0,
          reviews: []
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
        this.tags = offerToEdit.tags.map(tag => (tag = { text: tag }));
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    prevent() {
      return false;
    },
    async save() {
      const newOffer = this.editedOffer;
      if (newOffer._id) {
        await this.$store.dispatch({ type: "updateOffer", newOffer });
        this.$router.push("/explore");
      } else {
        newOffer.createdBy = this.connectedUser;
        await this.$store.dispatch({ type: "addOffer", newOffer });
        this.$router.push("/explore");
      }
    },
    async searchPhotos() {
      const searchTerm = this.editedOffer.tags.join(" ");
      try {
        const imgUrls = await this.$store.dispatch({
          type: "searchRelatedPhotos",
          searchTerm
        });
        console.log(imgUrls);
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
    },
    setPlace(payload) {
      console.log(payload);
      console.log(payload.geometry.location.lat())
      this.editedOffer.location.address = payload.formatted_address
      this.editedOffer.location.lat = payload.geometry.location.lat()
      this.editedOffer.location.lng = payload.geometry.location.lng()
      console.log('edited offer is now:', this.editedOffer)
    }
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    }
  },
  components: {
    VueTagsInput,
    DynamicList,
    DynamicCarousel,
  }
};
</script>

<style lang="scss">
.offer-edit {
  @include flexCustom(left, center, row);
  form {
    min-height: max-content;
    display: flex;
    width: max-content;
    padding: 10px;
    & > * {
      margin: 6px;
      // height: rem(48px);
      padding: 0.75em;
      background-color: #f2f2f2;
      border-radius: 2px;
    }

    select {
      border: none;
      border-bottom: 1px solid $tpGray2;
      color: #495057;
      width: 324px;
      margin: 6px;
    }

    .vue-tags-input {
      background: none;
      padding: 0;
      .ti-input {
        border: none;
        border-bottom: 1px solid $tpGray2;
      }
      input {
        background: none;
      }
    }

    .form-control {
      background: white;
      border-radius: 4px;
      width: 360px;
      font-size: 14px;
      margin: 10px 0;
    }
    .session-type {
      margin: 0;
      margin-bottom: 20px;
    }
    .category {
      margin: 0;
      margin-bottom: 20px;
    }

    .duration-container {
      display: flex;
      align-items: center;
      div {
        width: 75px;
      }
      input {
        max-width: 75px;
      }
    }

    .single-group-container {
      margin-bottom: 20px;
    }
  }

  .add-offer-btn {
    width: 50%;
    place-self: center;
    @include btnActionColor;
  }
}
.settings-first,
.settings-second {
  @include flexCustom(flex-start, left, column);
  height: 100%;
}
.edit-container {
  @include flexCustom(center, center, column);
  height: calc(100vh - 50px);
  overflow: auto;
  flex: 1;
  padding: 20px;
  display: flex;
  .difficulty-container {
    padding: 0;
    // padding: 5px;
    // padding-left: 30px;
  }
}

.edit-container form .settings-first .title-input,
.edit-container form .settings-first .desc-input {
  margin: 0;
  margin-bottom: 20px;
}

.dynamic-carousel {
  width: 360px;
  // position: absolute;
}

.profile-sidebar {
  height: 100%;
}
</style>

