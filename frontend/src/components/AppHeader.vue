<template>
  <section class="app-header">
    <div @click="goHome()" class="logo-container">
      <img class="logo" src="../assets/logo.png" />
      <span class="logo-title fs14 strong">LevelUp</span>
    </div>
    <div class="nav-container fs12">
      <router-link exact to="/">Home</router-link>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="user-action-container">
      <button class="btn-login">Login</button>
      <button class="btn-register">Register</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
};
</script>

<style scoped lang="scss">
.app-header {
  @include flexCustom(space-between, center, row);
  background: $tpPurple;
  line-height: rem(50px);
  font-family: $Montserrat-Regular;
  padding: 0 rem(10px) 0 rem(10px);
  box-shadow: 2px 15px 26px -10px rgba(0,0,0,0.59);
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
}

.nav-container > *:not(:last-child) {
  margin-right: rem(30px)
}

.btn-register {
  @include btnActionColorSm;
}

.btn-login {
  @include btnActionSm;
  margin-right: rem(10px)
}
</style>
