<template>
  <div id="app" class="flex column">
    <AppHeader />
    <ChatApp v-if="connectedUser"/>
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import ChatApp from './components/ChatApp'
export default {
computed: {
  connectedUser() {
    return this.$store.getters.connectedUser
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
