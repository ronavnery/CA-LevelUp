<template>
  <carousel v-if="imgs.length" :mouseDrag="true" :paginationColor="'#159046'" :perPage="2">
    <slide class="slide" v-for="(img,idx) in imgs" :key="idx" data-index="0" data-name="MySlideName">
      <img :src="img" width="auto" @click.prevent="addPhoto(img)" />
    </slide>
  </carousel>
</template>


<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  props: {
    imgs: {
      type: Array
    }
  },

  methods: {
    handleSlideClick(dataset) {
      return;
    },
    addPhoto(img) {
      this.$emit("img-choosed", img);
    }
  },

  components: {
    Carousel,
    Slide
  }
};
</script>

<style lang="scss" scoped>
.slide {
  display: flex;
  justify-content: center;
}
img {
  width: 90%;
}
</style>
