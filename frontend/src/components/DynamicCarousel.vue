<template>
  <carousel v-if="imgs.length" :mouseDrag="true" :paginationColor="'#159046'" :perPage="2">
    <slide class="slide" v-for="(img,idx) in imgs" :key="idx" data-index="0" data-name="MySlideName">
      <img :src="img" width="auto"
      @click="e => e.target.classList.toggle('choosed')"
      @click.prevent="addPhoto(img,idx)" />
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

  data() {
    return {
      isChoosed: {}
    }
  },

  methods: {
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
  border-radius: 4px;
  transition: 0.3s
}
.choosed {
  border: green solid 4px;
}
</style>
