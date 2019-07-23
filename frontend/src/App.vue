<template>
  <div id="app" class="flex column">
    <AppHeader @toggleSidebar="toggleSidebar"/>
    <MobileSidebar :showSidebar="showSideBar" :connectedUser="connectedUser"/>
    <ChatApp v-if="connectedUsers"/>
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import ChatApp from './components/ChatApp';
import MobileSidebar from './components/MobileSidebar';

export default {
computed: {
  connectedUsers() {
    return this.$store.getters.connectedUsers;
  },
  connectedUser() {
    return this.$store.getters.connectedUser || undefined;
  }
},
data() {
  return {
    showSideBar: false
  }
},
methods: {
  toggleSidebar() {
    this.showSideBar = !this.showSideBar
  }
},
components: {
    AppHeader,
    ChatApp,
    MobileSidebar
  },
};
</script>

