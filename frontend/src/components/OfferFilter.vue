<template>
  <section class="offer-filter-wrapper">
    <multiselect
      v-model="filter.category"
      :options="options"
      :searchable="false"
      @remove="removeCategory"
      @select="emitFilter"
    ></multiselect>
    <form @submit.prevent class="offer-filter">
      <input type="text" placeholder="Search" v-model="filter.txt" @keyup.enter="emitFilter" />
    </form>

    <div class="type-wrapper">
      <div @click="setType('')" data-value ref="type1" class="selected">All</div>
      <div @click="setType('group', $event)" data-value="group" ref="type2">Group</div>
      <div @click="setType('single', $event)" data-value="single" ref="type3">Single</div>
    </div>
  </section>
</template> 

<script>
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      filter: {
        txt: "",
        type: "",
        category: ""
      },
      options: [
        "Development",
        "Business",
        "Finance & Accounting",
        "Office Productivity",
        "Personal Development",
        "Design",
        "IT & Software",
        "Marketing",
        "Lifestyle",
        "Photography",
        "Music",
        "Teaching & Academics",
        "Health & Fitness"
      ]
    };
  },
  methods: {
    emitFilter() {
      this.$emit("filter-offers", this.filter);
    },
    removeCategory() {
      this.filter.category = "";
      this.emitFilter();
    },
    setType(selectedValue) {
      const targets = [this.$refs.type1, this.$refs.type2, this.$refs.type3];
      targets.forEach(target => {
        if (target.dataset.value !== selectedValue)
          target.classList.remove("selected");
        else target.classList.add("selected");
      });
      this.filter.type = selectedValue;
      this.emitFilter();
    }
  },

  components: {
    Multiselect
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>


<style lang="scss" scoped>
.multiselect {
  max-width: 215px;
}

.offer-filter-wrapper {
  border-radius: 4px;
  // height: 60px;
  display: flex;
  justify-content: space-between;
  width: 700px;
  // @include container(750px, 0, 0);
  // position: relative;
  // top: -25px;
  // @include flexCustom(space-between, center, row);
}

.offer-filter {
  position: relative;
  input {
    border-radius: 4px;
    // margin-left: 5px;
    // height
    outline: none;
    border: none;
    padding: 9px 33px 9px 10px;
  }

  &::after {
    content: url("../assets/musica-searcher.png");
    width: 24px;
    height: 24px;
    position: absolute;
    right: 5px;
    top: 9.5px;
  }
}

.type-wrapper {
  display: flex;
  margin-right: 5px;
  border-radius: 3px;
  overflow: hidden;
  div {
    display: inline-block;
    margin: 0;
    text-align: center;
    padding: 5px 15px;
    cursor: pointer;
    height: 46px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.135s;
    color: rgba(255, 255, 255, 0.7);
    line-height: 34px;
  }

  div.selected {
    background-color: grey;
    color: white;
  }
}
</style>


