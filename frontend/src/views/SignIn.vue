<template>
  <div class="sign-in">
    <form>
      <input type="text" v-model="credentials.nickName" placeholder="nickname" />
      <input type="password" v-model="credentials.password" placeholder="password" />
      <input @click.prevent="loginUser" type="submit" />
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "sign-in",
  data() {
    return {
      credentials: {
        nickName: "",
        password: ""
      }
    };
  },

  methods: {
    async loginUser() {
      await this.$store.dispatch({
        type: 'doLogin',
        credentials: this.credentials
      });
      this.$router.back();
    }
  },

  components: {}
};
</script>
