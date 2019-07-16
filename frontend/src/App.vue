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
  }
};
</script>



<style lang="scss">
#app {
  height: 100%;
}

</style>
