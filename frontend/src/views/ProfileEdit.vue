<template>
  <section class="user-profile-edit">
    <!-- <form @submit.prevent="">
      <input v-model="user.name" type="text" placeholder="Enter Your Name.." required />
      <input v-model="user.nickName" type="text" placeholder="Enter Your Nickname.." required />
      <input v-model="user.oldPassword" type="password" placeholder="Enter Your Old Password.." />
      <input v-model="newPassword" type="password" placeholder="Enter Your New Password.." :class="passwordsMatch" />
      <input v-model="confirmNewPassword" v-if="newPassword" type="password" placeholder="Confirm Your New Password.." :class="passwordsMatch" />
      <input v-model="user.skillTags" type="text" placeholder="Enter Your Skills.." />
      <input type="file" placeholder="Profile Pic" />
      <input v-model="user.city" type="text" placeholder="Enter Your City" />
      <input type="text">
    </form>-->
    <!-- Default form contact -->

    <form>
      <p class="h4 text-center mb-4">Edit</p>

      <label for="name-input" class="grey-text">Your Name</label>
      <input v-model="user.name" type="text" id="name-input" class="form-control" />

      <br />

      <label for="skill-input" class="grey-text">Skill Tags</label>
      <input type="text" id="skill-input" class="form-control" />
      <vue-tags-input v-model="skill" :tags="skills" @tags-changed="tagChanged" class="tag-input" ref="tagsInput"/>

      <br />

      <label for="city-input" class="grey-text">Enter Your City</label>
      <input v-model="user.city" type="text" id="city-input" class="form-control" />

      <br />
      <div>
        <label for="age-input">Your Age</label>
        <input type="range" class="custom-range" id="age-input" />
      </div>
      <br />

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
        </div>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          />
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
      </div>
      <br/>
      <label for="defaultFormContactMessageEx" class="grey-text">About Me</label>
      <textarea
        type="text"
        id="defaultFormContactMessageEx"
        class="form-control"
        rows="3"
        style="resize:none;"
      ></textarea>

      <div class="text-center mt-4">
        <button class="btn btn-outline-warning" type="submit">
          Send
          <i class="far fa-paper-plane ml-2"></i>
        </button>
        <button class="btn btn-outline-warning" @click.prevent="yada">
          Send
          <i class="far fa-paper-plane ml-2"></i>
        </button>
      </div>
    </form>
  </section>
</template>

<script>

import { mdbBtn } from 'mdbvue';
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  async created() {
    const { nickName } = this.$route.params;
    const user = await this.$store.dispatch({ type: "getProfile", nickName });
    this.user = user;
    
  },

  data() {
    return {
      skill: '',
      skills: [],
      user: null,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  computed: {

  },
  methods: {
    tagChanged(e) {
      console.log(e)
    },
    yada() {
      console.log(this.$refs)
    }
  },
  components: {
    mdbBtn,
    VueTagsInput
  }
};
</script>

<style lang="scss" scoped>
form {
  padding: rem(16px);
  max-width: 500px;
}

div.vue-tags-input.tag-input {
      display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}

</style>

