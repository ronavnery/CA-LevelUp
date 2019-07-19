<template>
<section v-if="currProfile" class="profile-edit-container">
  <header>
    <span class="fs32 strong">Hi, I'm {{currProfile.name}}</span>
  </header>
  <body class="content">
      <p class="fs18 strong">About me</p>
      <span>{{currProfile.aboutMe}}</span>
  </body>
</section>
</template>

<script>
export default {
  name: "ProfileDetails",
  computed: {
    currProfile() {
      return this.$store.getters.currProfile;
    }
  }
};
</script>

<style scoped lang="scss">
.profile-edit-container {
  @include flexCustom(center, left, column);
}

header {
  height: 150px;
  @include flexCustom(center, center, column);
  background: $tpBlue1;
  color: $tpWhite;
}

.content {
  padding: 20px;
  align-self: flex-start;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
