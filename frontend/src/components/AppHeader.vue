<template>
  <section class="app-header">
    <div class="logo-container">
      <img class="logo" src="../assets/logo.png" />
      <span class="logo-title fs14">LevelUp</span>
    </div>
    <div class="nav-container fs14">
      <router-link exact to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/sign-in">Sign-in</router-link>
    </div>
    <div class="user-action-container">
      <button class="btn-login">Login</button>
      <button class="btn-register">Register</button>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.app-header {
  @include flexCustom(space-between, center, row);
  background: $tpPurple;
  height: rem(50px);
  font-family: $Montserrat-Regular;
  padding: 0 rem(100px) 0 rem(100px);
}

a {
  padding: rem(10px);
}

.logo-container {
  @include flexCenter(center);
}

.logo-title {
  margin-left: rem(5px);
}

.logo {
  width: rem(30px);
}

.nav-container {
  margin-right: rem(40px);
  text-transform: uppercase;
}

.btn-register {
  @include btnActionColorSm;
}

.btn-login {
  @include btnActionCleanSm;
  margin-right: rem(10px)
}
</style>
