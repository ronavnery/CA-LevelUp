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
  async created() {
    // try {
    //   const user = await this.$store.dispatch({type: 'checkIfLoggedInUser'})
    //   console.log('logged In:', user)
    // } catch (err) {
    //   console.log('No User Logged In')
    // }
  }
};
</script>



<style lang="scss">
#app {
  height: 100%;
}

</style>
