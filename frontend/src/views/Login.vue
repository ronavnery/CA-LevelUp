<template>
  <div class="login">
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
  name: "login",
  data() {
    return {
      credentials: {
        nickName: "",
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
