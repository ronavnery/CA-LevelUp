<template>
  <div class="home"> 
     <div class="overlay"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  }
}
</script>

<style scoped lang="scss">

.home {
  height: calc(100vh - 50px);
  background-image: url('../assets/backgrounds/home.jpg');
  background-size: cover;
  background-position-y: -80px;
  .overlay {
    height: calc(100vh - 50px);
    background-color: $tpBlue1;
    opacity: 0.5;
  }
}


</style>

