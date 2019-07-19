<template>
  <section class="home">
      <span class="changing-title fs36">Level up in </span>
    <div class="changing-title fs36">
      <vue-typer class="typer"
        :text='["Development","Business","Finance & Accounting","IT & Software","Office Productivity","Personal Development","Design","Marketing","Photography","Health & Fitness","Music","Teaching & Academics"]'
        :repeat="Infinity"
        :shuffle="true"
        initial-action="typing"
        :pre-type-delay="70"
        :type-delay="70"
        :pre-erase-delay="2000"
        :erase-delay="50"
        erase-style="backspace"
        :erase-on-complete="false"
        caret-animation="solid"
      ></vue-typer>
    </div>
  </section>
</template>

<script>
import OfferFilter from "@/components/OfferFilter.vue";
export default {
  name: "home",
  components: {
    OfferFilter
  },
  data() {
    return {
      filter: {
        txt: ""
      }
    };
  }
};
</script>

<style scoped lang="scss">
.home {
  height: calc(100vh - 50px);
  background-image: url("../assets/backgrounds/home-purple.jpg");
  background-size: cover;
  background-position-y: -80px;
  @include flexCenter(column);
  .overlay {
    height: calc(100vh - 50px);
    background-color: $tpBlue1;
    opacity: 0.5;
  }
}

.changing-title {
  color: $tpWhite;
}

.vue-typer {
  color: white;
}

</style>

