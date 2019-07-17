<template>
  <section class="offer-filter">
    <form @submit.prevent="filterOffers">
      <div class="search-box">
        <img src="../assets/search.png" alt />
        <input @input="filterOffers" v-model="filter.txt" type="text" placeholder="Look For Anything..."/>
        <button v-show="filter.txt" @click.stop="clearTxt">
          <svg
            viewBox="0 0 426.667 426.667"
            width="16px"
            height="16px"
          >
            <path
              style="fill:#ECEBED;"
              d="M213.333,0C95.514,0,0,95.514,0,213.333s95.514,213.333,213.333,213.333
	s213.333-95.514,213.333-213.333S331.153,0,213.333,0z M330.995,276.689l-54.302,54.306l-63.36-63.356l-63.36,63.36l-54.302-54.31
	l63.356-63.356l-63.356-63.36l54.302-54.302l63.36,63.356l63.36-63.356l54.302,54.302l-63.356,63.36L330.995,276.689z"
            />
          </svg>
        </button>
      </div>
      <button type="submit" class="search-btn">Search</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
        filter: {
            txt: ''
        }
    };
  },
  methods: {
      clearTxt() {
          this.filter.txt = '';
      },
      filterOffers() {
          this.$emit('filter-offers', this.filter)
      }
  }
};
</script>

<style lang="scss" scoped>
.offer-filter {
  width: 100%;
  padding: 20px 0;
  background: #3d2b61;
}

form {
  @include flexCenter(row);
}

.search-box {
  @include flexCustom(flex-start, stretch, row);
  width: rem(400px);
  min-width: 200px;
  background: white;
  padding: 8px 5px;
  border-radius: 5px;
  margin-right: 8px;

  input {
    flex: 1;
    background: transparent;
    color: #756f6f;
    border: 0;
    outline: 0px;
  }

  img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }

  button {
    background: transparent;
    border: 0px;
    padding: 0;
    cursor: pointer;
    @include flexCenter(row);
  }
}

// Todos: use button mixin instead
.search-btn {
    width: 200px;
    padding: 8px 0;
    background: transparent;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    font-family: 'Montserrat-Bold', sans-serif;
    font-size: rem(16px);
    font-weight: bold;
    outline: none;
    text-transform: uppercase;
    position: relative;

    &::after {
        content: url('../assets/arrow-right.svg');
        position: absolute;
        @include flexCenter(row);
        right: 5px;
        top: 5px;
    }
}
</style>


