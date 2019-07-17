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

      <label for="defaultFormContactNameEx" class="grey-text">Your Name</label>
      <input v-model="user.name" type="text" id="defaultFormContactNameEx" class="form-control" />

      <br />

      <label for="defaultFormContactSubjectEx" class="grey-text">Skill Tags</label>
      <input type="text" id="defaultFormContactSubjectEx" class="form-control" />

      <br />

      <label for="defaultFormContactSubjectEx" class="grey-text">Enter Your City</label>
      <input v-model="user.city" type="text" id="defaultFormContactSubjectEx" class="form-control" />

      <br />
      <div>
        <label for="customRange1">Your Age</label>
        <input type="range" class="custom-range" id="customRange1" />
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
      <br />
        <label for="defaultFormContactSubjectEx" class="grey-text">Enter Your City</label>
        <input v-model="user.intro" type="text" id="defaultFormContactSubjectEx" class="form-control" />
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
      </div>
    </form>
  </section>
</template>

<script>

import { mdbBtn } from 'mdbvue';

export default {
  async created() {
    const { nickName } = this.$route.params;
    const user = await this.$store.dispatch({ type: "getProfile", nickName });
    this.user = user;
  },
  data() {
    return {
      user: null,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  computed: {
     
  },
  components: {
    mdbBtn,
  }
};
</script>

<style lang="scss" scoped>
form {
  padding: rem(16px);
  max-width: 500px;
}
</style>

