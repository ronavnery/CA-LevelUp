<template>
  <section class="app-header">
    <div class="logo-container">
      <img class="logo" src="../assets/logo.png" />
    </div>
    <div class="nav-container fs14">
    <router-link exact to="/">Home</router-link>
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
  padding: rem(10px);
}

.app-header {
  @include flexCustom(space-between, center, row);
  background: $tpPurple;
  height: rem(50px);
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
}

.logo {
  width: rem(30px);
  margin-left: rem(40px);
}

.nav-container {
  margin-right: rem(40px)
}
</style>
