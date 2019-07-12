<template>
  <div class="sign-in">
    <form>
      <input type="text" v-model="credentials.username" placeholder="username" />
      <input type="password" v-model="credentials.password" placeholder="password" />
      <input @click.prevent="connectUser" type="submit" />
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
    connectUser() {
      this.$store.dispatch({
        type: 'connectUser',
        credentials: this.credentials
      });
    }
  },

  components: {}
};
</script>
