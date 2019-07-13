<template>
  <section class="sidebar-container">
      <section class="sidebar-content">
      <img class="profile-img" :src="profile.img" />
      <span class="name fs20">{{profile.name}}</span>
      <span class="city fs14">{{profile.city}}</span><br><br>
      <span class="city fs12">{{profile.intro}}</span>
      </section>
  </section>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object
    }
  }
};
</script>


<style scoped lang="scss">
.sidebar-container {

  height: 100%;
  width: 350px;
  background: $tpPink;
  color: $tpGray;
  box-shadow: 11px 2px 26px -10px rgba(0,0,0,0.75);
}

.sidebar-content {
  @include flexCustom(center, center, column);
  height: 50%;
  padding: rem(40px);
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
