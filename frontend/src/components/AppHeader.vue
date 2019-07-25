<template>
  <section class="app-header">
    <div @click="goHome" class="logo-container">
      <img class="logo" src="../assets/logo/levelup-v5.png" />
    </div>
    <div class="nav-container fs12">
      <router-link exact to="/" class="header-link">Home</router-link>
      <router-link to="/explore" class="header-link">Explore</router-link>
      <router-link to="/map" class="header-link">Map</router-link>
      <router-link to="/about" class="header-link">About</router-link>
    </div>
    <button @click="emitToggSidebar" class="mobile-nav-btn">
      <i class="fas fa-bars"></i>
    </button>
    <UserDashboard :currUser="connectedUser" v-if="connectedUser" class="user-dashboard" />
    <div class="user-action-container" v-else>
      <button class="btn-login" @click="goLogin">Login</button>
      <button class="btn-signup" @click="goSignUp">Sign-Up</button>
    </div>
  </section>
</template>

<script>
import UserDashboard from "@/components/UserDashboard.vue";

export default {
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goSignUp() {
      this.$router.push("/sign-up");
    },
    goHome() {
      this.$router.push("/");
    },
    emitToggSidebar() {
      this.$emit("toggle-sidebar");
    }
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    }
  },
  components: {
    UserDashboard
  }
};
</script>

<style scoped lang="scss">
.app-header {
  @include flexCustom(space-between, center, row);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
  background: $tpPurple;
  line-height: rem(50px);
  min-height: 50px;
  font-family: $Montserrat-Regular;
  padding: 0 rem(10px) 0 rem(10px);
  box-shadow: 2px 15px 26px -10px rgba(0, 0, 0, 0.59);
}

.logo-container {
  @include flexCenter(row);
  cursor: pointer;
  width: 120px;
}

.nav-container {
  display: none;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include for-normal-layout {
    display: flex;
  }
}

.nav-container > *:not(:last-child) {
  margin-right: rem(18.4px);
}

.btn-signup {
  @include btnActionColorSm;
}

.btn-login {
  @include btnActionSm;
  margin-right: rem(10px);
}

.user-dashboard {
  display: none;
  @include for-normal-layout {
    display: flex;
  }
}

.user-action-container {
  display: none;
  @include for-normal-layout {
    display: block;
  }
}

.mobile-nav-btn {

  background: transparent;
  color: white;
  border: none;
  font-size: 20px;
  outline: none;
  @include for-normal-layout {
    display: none;
  }
}
</style>
