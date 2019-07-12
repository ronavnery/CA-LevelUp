<template>
  <section class="app-header flex">
    <div class="logo-container">
      <img class="logo" src="../assets/logo.png" />
    </div>
    <div class="nav-container">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/explore">Explore</router-link>
    <router-link to="/sign-in">Sign-in</router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
a {
  color: $headerNavTxt;
  text-decoration: none;
}

.app-header {
  @include flexCustom(center, center, row);
  background: $tpPurple;
  height: rem(60px);
}

.logo {
  width: 50px;
}
</style>
