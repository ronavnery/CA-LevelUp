<template>
  <section class="offer-filter-wrapper">
    <multiselect
      v-model="filter.category"
      :options="options"
      :searchable="false"
      :select-label="''"
      :deselect-label="''"
      :selectedLabel="''"
      :placeholder="'Choose A Category'"
      @remove="removeCategory"
      @select="emitFilter"
    ></multiselect>
    <form @submit.prevent class="offer-filter">
      <input type="text" placeholder="ie. Hula hooping..." v-model="filter.txt" @keyup.enter="emitFilter" />
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
        txt: '',
        groupType: '',
        category: ''
      },
      options: [
        "Development",
        "Business",
        "Finance & Accounting",
        "Office Productivity",
        "Personal Development",
        "Design",
        "DIY",
        "Just For Fun",
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
      this.filter.groupType = selectedValue;
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
  display: flex;
  justify-content: space-between;
  width: 700px;


  @media screen and(max-width: 760px) {
    flex-direction: column;
    max-width: 700px;
    align-items: center;
    &>* {
      margin: 10px;
    }
  }
}

.offer-filter {
  position: relative;
      width: max-content;
  input {
    border-radius: 4px;
    height: 100%;
    outline: none;
    border: none;
    padding: 9px 33px 9px 10px;
    &::placeholder {
      color: $tpGray2;
    }
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
  border-radius: 4px;
  overflow: hidden;
  div {
    display: inline-block;
    margin: 0;
    text-align: center;
    padding: 5px 15px;
    cursor: pointer;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.135s;
    color: rgba(255, 255, 255, 0.7);
    line-height: 2;
  }

  div.selected {
    background-color: $tpPink2;
    color: white;
  }
}
</style>


