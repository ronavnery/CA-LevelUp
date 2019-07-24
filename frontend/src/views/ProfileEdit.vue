<template>
  <section class="user-profile-edit" v-if="user">
    <form @submit.prevent="updateUser">
      <p class="h4 text-center mb-4">Edit</p>

      <label for="name-input" class="grey-text">Your Name</label>
      <input v-model="user.name" type="text" id="name-input" class="form-control" />

      <br />

      <label for="skill-input" class="grey-text">Skill Tags</label>
      <vue-tags-input
        v-model="skill"
        id="skill-input"
        :tags="skills"
        @tags-changed="tagChanged"
        class="tag-input"
        ref="tagsInput"
      />

      <br />

      <label for="city-input" class="grey-text">Enter Your City</label>
      <input v-model="user.city" type="text" id="city-input" class="form-control" />

      <br />
      <div>
        <label for="age-input">Your Age</label>
        <input
          v-model.number="user.age"
          type="range"
          class="custom-range"
          id="age-input"
          name="age-input"
          min="10"
          max="120"
        />
        <span>{{user.age}}</span>
      </div>
      <br />

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroupFileAddon01"><img v-if="imgIsUploading" src="../assets/Ripple.gif" alt=""></span>
        </div>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            ref="myImg"
            @change="getImgUrl"
          />
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
      </div>
      <br />
      <label for="img-input" class="grey-text">Or Just Enter An Image Url</label>
      <input v-model="user.imgUrl" type="text" id="img-input" class="form-control" />
      <br />
      <label for="defaultFormContactMessageEx" class="grey-text">About Me</label>
      <textarea
        v-model="user.aboutMe"
        type="text"
        id="defaultFormContactMessageEx"
        class="form-control"
        rows="3"
        style="resize:none;"
      ></textarea>

      <div class="text-center mt-4">
        <button class="btn btn-outline-warning" type="submit">
          Update
          <i class="far fa-paper-plane ml-2"></i>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import cloudinaryService from "../services/cloudinary.service";

export default {
  async created() {
    const { nickName } = this.$route.params;
    const user = await this.$store.dispatch({ type: "getProfile", nickName });
    this.user = user;
    this.skills = this.user.skillTags.map(skill => {
      const skillFormatted = {text: skill, tiClasses: ['ti-valid']}
      return skillFormatted
    })
    // this.skills = this.user.skillTags
  },

  data() {
    return {
      skill: "",
      skills: [],
      imgIsUploading: false,
      user: null
      // oldPassword: "",
      // newPassword: "",
      // confirmNewPassword: ""
    };
  },
  computed: {},
  methods: {
    tagChanged(newSkills) {
      console.log(newSkills);
      const newSkillsFormatted = newSkills.map(skill => skill.text);
      this.user.skillTags = newSkillsFormatted;
    },
    async getImgUrl(ev) {
      try {
        this.imgIsUploading = !this.imgIsUploading;
        const file = (ev.target.files[0])
        const imgUrl =  await cloudinaryService.uploadImgToCloud(file)
        this.user.imgUrl = imgUrl
        this.imgIsUploading = !this.imgIsUploading;
      } catch(err) {
        console.log('couldnt generate ImgUrl')
      }
    },
    async updateUser() { 
        try {

          const updatedUser = await this.$store.dispatch({type: 'updateUser', userToUpdate: this.user})
          console.log(updatedUser.name, 'Was Successfully Updated!')
          
        } catch(err) {
          console.log('couldnt update user got err:', err)
        }
    }
  },
  components: {
    VueTagsInput
  }
};
</script>

<style lang="scss" scoped>
.user-profile-edit {
  overflow: auto;
  height: 100%;
}
form {
  padding: rem(16px);
  max-width: 500px;
}

.vue-tags-input[data-v-61d92e31] {
  display: block;
  width: 100%;
  max-width: unset;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}



</style>

