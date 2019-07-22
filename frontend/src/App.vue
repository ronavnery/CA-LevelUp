<template>
  <div id="app" class="flex column">
    <AppHeader />
    <ChatApp v-if="connectedUsers"/>
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import ChatApp from './components/ChatApp'
export default {
computed: {
  connectedUsers() {
    return this.$store.getters.connectedUsers
  }
},
  components: {
    AppHeader,
    ChatApp
  },
};
</script>



<style lang="scss">
#app {
  height: 100%;
}

</style>
