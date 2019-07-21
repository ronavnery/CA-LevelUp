<template>
  <section class="profile-content-container">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "ProfileContent"
};
</script>

<style scoped lang="scss">
.profile-content-container {
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
}



</style>
