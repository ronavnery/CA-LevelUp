<template>
  <div id="app" class="flex column">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {

  components: {
    AppHeader
  },
  async mounted() {
    try {
      this.$store.dispatch({type: 'checkIfLoggedInUser'})
    } catch(err) {
      console.log('App Couldnt find logged in user');
    }
  }
};
</script>



<style lang="scss">
#app {
  height: 100%;
}

</style>
