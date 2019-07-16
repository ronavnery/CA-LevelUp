<template>
  <section class="app-header">
    <div @click="goHome" class="logo-container">
      <img class="logo" src="../assets/logo.png" />
      <span class="logo-title fs14 strong">LevelUp</span>
    </div>
    <div class="nav-container fs12">
      <router-link exact to="/">Home</router-link>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <UserDashboard :currUser="connectedUser" v-if="connectedUser" />
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
  position: relative;
  background: $tpPurple;
  line-height: rem(50px);
  font-family: $Montserrat-Regular;
  padding: 0 rem(10px) 0 rem(10px);
  box-shadow: 2px 15px 26px -10px rgba(0, 0, 0, 0.59);
  // For floating header:
  // border-radius: 15px;
  // margin-bottom: rem(30px)
}

a {
  padding: rem(10px);
}

.logo-container {
  @include flexCenter(center);
  cursor: pointer;
}

.logo-title {
  margin-left: rem(5px);
  color: white;
}

.logo {
  width: rem(30px);
}

.nav-container {
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nav-container > *:not(:last-child) {
  margin-right: rem(30px);
}

.btn-signup {
  @include btnActionColorSm;
}

.btn-login {
  @include btnActionSm;
  margin-right: rem(10px);
}
</style>
