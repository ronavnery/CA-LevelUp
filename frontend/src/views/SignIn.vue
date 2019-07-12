<template>
  <div class="sign-in">
    <form>
      <input type="text" v-model="credentials.username" placeholder="username" />
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
        username: "",
        password: ""
      }
    };
  },

  methods: {
    loginUser() {
      this.$store.dispatch({
        type: 'loginUser',
        credentials: this.credentials
      });
    }
  },

  components: {}
};
</script>
