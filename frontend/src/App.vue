<template>
  <div id="app" class="flex column">
    <AppHeader @toggle-sidebar="toggleSidebar"/>
    <MobileSidebar :showSidebar="showSideBar" :connectedUser="connectedUser" @toggle-me="toggleSidebar" />
    <ChatApp v-if="connectedUser"/>
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import ChatApp from './components/ChatApp';
import MobileSidebar from './components/MobileSidebar';

export default {
computed: {
  connectedUser() {
    return this.$store.getters.connectedUser || undefined;
  }
},
data() {
  return {
    showSideBar: false
  }
},
mounted() {
  console.log('PROCESS:',process.env.NODE_ENV)
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

