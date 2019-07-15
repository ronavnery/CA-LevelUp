<template>
  <section class="user-profile-edit" v-if="user">
    <form @submit.prevent="">
      <input v-model="user.name" type="text" placeholder="Enter Your Name.." required />
      <input v-model="user.userName" type="text" placeholder="Enter Your Username.." required />
      <input v-model="user.email" type="email" placeholder="Enter Your Email.." required />
      <input v-model="user.oldPassword" type="password" placeholder="Enter Your Old Password.." />
      <input v-model="newPassword" type="password" placeholder="Enter Your New Password.." :class="passwordsMatch" />
      <input v-model="confirmNewPassword" v-if="newPassword" type="password" placeholder="Confirm Your New Password.." :class="passwordsMatch" />
      <input v-model="user.skillTags" type="text" placeholder="Enter Your Skills.." />
      <input type="file" placeholder="Profile Pic" />
    </form>
  </section>
</template>

<script>

export default {
  created() {
    this.user = this.$store.getters.connectedUser;
    this.confirmedPassword = this.user.password;
  },
  data() {
    return {
      user: null,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  },
  computed: {
    passwordsMatch() {
      if (this.newPassword !== this.confirmNewPassword) return 'pass-dont-match';
      return 'pass-match';
    }
  },
  components: {

  }
}
</script>
