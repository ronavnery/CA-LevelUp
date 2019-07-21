<template>
  <section class="review-list-wrapper">
    <h4 style="margin-top: 8px;">Reviews:</h4>
    <main>
      <div v-for="(review, idx) in reviews" :key="idx">
        <button class="accordion" @click="toggleReview($event)" :ref="idx">
          <div class="wrapper">
            <div class="review-maker-image" :style="getImage(review.maker.imgUrl)"></div>
            <div class="title-time">
              <p>{{review.title| truncateText(50)}}</p>
              <div class="date-wrapper">
                <i class="fas fa-clock"></i>
                <span>{{review.createdAt | formatDateFromNow}}</span>
              </div>
            </div>
          </div>
          <StarRating
            :rating="review.score"
            :round-start-rating="false"
            :read-only="true"
            :star-size="15"
          />
        </button>
        <div class="panel">
          <p>What they had to say:</p>
          <p>{{review.body}}</p>
          <div class="title-date-wrapper"></div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "ReviewList",
  props: {
    reviews: {
      type: Array
    }
  },
  computed: {},
  components: {
    StarRating
  },
  methods: {
    toggleReview(ev) {
      if (!ev.target.classList.contains("accordion")) return;
      const review = ev.target.nextElementSibling;
      if (!review.style.maxHeight || review.style.maxHeight === "0px") {
        review.style.maxHeight = review.scrollHeight + "px";
      } else {
        review.style.maxHeight = "0px";
      }
      // if (!review.classList.contains('panel-active')) review.classList.add('panel-active');
      // else review.classList.remove('panel-active');
    },
    getImage(url) {
      return {
        "background-image": `url(${url})`,
        "background-size": "cover",
        "background-position": "center",
        "object-fit": "cover"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  max-width: 500px;
  background-color: $tpGray;
  border-radius: 4px;
  opacity: 0.9;
  color: $tpPurple;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  @include flexCustom(space-between, center, row);
  flex-wrap: wrap;
  .wrapper {
    @include flexCustom(space-between, center, row);
    .review-maker-image {
      @include btnRound(45px);
    }

    .title-time {
      margin: 0 0 0 10px;
    }

    p {
      margin: 0;
      font-weight: bold;
    }
  }
}

.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  width: 500px;
  overflow: hidden;
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  transition: max-height 0.2s ease-out;
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-top: 0px;
  @include flexCustom(flex-start, stretch, column);
  p:first-child {
    margin: 8px 0;
    font-size: rem(20px);
    font-weight: bold;
  }
}

.date-wrapper {
  text-align: end;
  color: #00000073;
  padding-bottom: 5px;
  i {
    margin-right: 5px;
    font-size: 12px;
    // font-weight: 300;
  }

  span {
    font-size: 12px;

    font-weight: 500;
    line-height: 2px;
  }
}
// margin: 8px 0;
// font-weight: bold;
// @include flexCustom(space-between, center, row);

// p {
//   margin: 0;
// }
// .panel.panel-active {
//   max-height: unset;
// }
</style>
