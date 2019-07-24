<template>
  <section @click="goToDetails" class="offer-preview" :class="{marked: isMarked}" v-if="offer">
    <header>
      <div class="header-category">
        <i :class="categoryIcon" class="fs14"></i>
        <span>{{offer.category}}</span>
      </div>
      <div class="user-actions" v-if="userOwnOffer">
        <button @click.stop="goToEdit">
          <i class="fs12 far fa-edit"></i>
        </button>
        <button @click.stop="removeOffer">
          <i class="fs12 far fa-trash-alt" @click.stop="removeOffer"></i>
        </button>
      </div>
    </header>
    <main>
      <img :src="offer.imgs[0]" alt />
      <div class="user-date-starred-container">
        <div class="wrapper">
          <img :src="offer.createdBy.imgUrl" alt />
          <span>{{offer.createdBy.name}}</span>
        </div>
        <div class="rating fs12">
          <span class="rating-avg" v-if="offer.rating.avgScore > 0">
            <span class="rating-avg-text strong">{{offer.rating.avgScore}}</span>
            ({{offer.rating.reviews.length}})
          </span>
          <span class="rating-avg" v-else>Unrated</span>
          <i
            class="star-full fas fa-star"
            v-if="offer.rating.avgScore > 0"
            :class="{'high-rating': offer.rating.avgScore > 4 }"
          ></i>
          <i class="far fa-star" v-else></i>
        </div>
      </div>

      <div class="details">
        <p class="title">{{offer.title | truncateText(30)}}</p>
        <p class="desc">{{offer.description | truncateText(320)}}</p>
        <p v-for="tag in offer.tags.slice(0,3)" :key="tag" class="tags">{{tag}}</p>
      </div>
    </main>
    <hr />
    <footer v-if="!isOnMapView">
      <div class="wrapper">
        <button class="like" @click.stop>
          <i class="fs14 far fa-heart"></i>
        </button>
        <span>{{this.offer.interested.length}}</span>
      </div>
      <div class="wrapper">
        <button class="contact" @click.stop>
          <i class="fs14 far fa-comment-dots"></i>
        </button>
        <button class="share" @click.stop>
          <i class="fas fa-share-alt"></i>
        </button>
      </div>
    </footer>
    <footer v-else>
      <button class="btn-goToDetails" @click="goToDetails(event, 'forced')">Go to details</button>
    </footer>
  </section>
</template>

<script>
export default {
  name: "OfferPreview",
  props: {
    offer: {
      type: Object
    },
    currMarkedOfferId: {
      type: String
    }
  },
  methods: {
    goToDetails(ev, isForced) {
      if (!isForced) {
        if (this.isOnMapView) return this.$emit("offerClicked", this.offer)
      }
      this.$router.push({
        name: "OfferDetails",
        params: {
          nickName: this.offer.createdBy.nickName,
          offerId: this.offer._id
        }
      });
      this.$store.dispatch({
        type: "logUserCategoryChoice",
        category: this.offer.category,
        user: this.connectedUser ? this.connectedUser.nickName : "visitor"
      });
    },
    goToEdit() {
      this.$router.push(`profile/edit/${this.offer._id}`);
    },
    removeOffer() {
      this.$emit("removeOffer", this.offer._id);
    },
    goToProfile() {
      this.$router.push(`/profile/${this.offer.createdBy.nickName}`);
    }
  },
  computed: {
    isOnMapView() {
      return this.$route.name === "MapView";
    },
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    connectedUserNickName() {
      return this.$store.getters.connectedUser.nickName;
    },

    starIconFill() {
      if (this.offer.stars >= 4) return "#ffbf00";
      else if (this.offer.stars < 4 && this.offer.stars >= 3) return "#ffcf40";
      else if (this.offer.stars < 3 && this.offer.stars >= 2) return "#ffdc73";
      return "#8e8b80";
    },

    categoryIcon() {
      if (this.offer.category === "Development") return "fas fa-file-code";
      else if (this.offer.category === "Business") return "fas fa-briefcase";
      else if (this.offer.category === "Just For Fun") return "far fa-grin-tears";
      else if (this.offer.category === "DIY") return "fas fa-tools";
      else if (this.offer.category === "Finance & Accounting") return "fas fa-balance-scale";
      else if (this.offer.category === "Office Productivity") return "fas fa-mail-bulk";
      else if (this.offer.category === "Personal Development") return "fas fa-user-plus";
      else if (this.offer.category === "Design") return "fas fa-pencil-ruler";
      else if (this.offer.category === "IT & Software") return "fas fa-sitemap";
      else if (this.offer.category === "Marketing") return "fas fa-ad";
      else if (this.offer.category === "Lifestyle") return "fas fa-gamepad";
      else if (this.offer.category === "Photography") return "fas fa-camera-retro";
      else if (this.offer.category === "Health & Fitness") return "fas fa-running";
      else if (this.offer.category === "Music") return "fas fa-guitar";
      else if (this.offer.category === "Teaching & Academics") return "fas fa-user-graduate";
    },
    userOwnOffer() {
      const connectedUser = this.$store.getters.connectedUser;
      if (
        !connectedUser ||
        this.offer.createdBy.nickName !== connectedUser.nickName
      )
        return false;
      else return true;
    },
    isMarked() {
      return this.currMarkedOfferId === this.offer._id;
    }
  }
};
</script>





<style scoped lang="scss">
.offer-preview {
  @include flexCustom(space-between, stretch, column);
  // width: rem(250px);
  background: $tpWhite;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 5px;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }

  // &:hover {
  //   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  // }
}

header {
  @include flexCustom(space-between, center, row);
  min-height: 30px;
  margin-left: 10px;

  .user-actions {
    @include flexCenter(row);
  }

  i {
    font-size: rem(20px);
    color: $btnBlue1;
  }

  span {
    color: $tpPurple;
    line-height: 1px;
    margin-left: 6px;
    font-size: rem(12px);
  }

  button {
    width: 20px;
    height: 20px;
    margin: 3px;
    outline: none;
  }

  button:first-of-type {
    margin-left: auto;
  }
}

main {
  @include flexCustom(inherit, stretch, column);

  img {
    height: 150px;
    object-fit: cover;
  }

  .user-date-starred-container {
    @include flexCustom(space-between, center, row);
    margin-bottom: 15px;
    margin-right: 5px;
    .wrapper {
      display: flex;
      position: relative;
      height: 30px;
      img {
        position: relative;
        left: 5px;
        top: -13.5px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 5px solid white;
        background: white;
      }
      span {
        margin-left: 10px;
        line-height: 24px;
        font-weight: bold;
        font-size: rem(12px);
        color: $tpPurple;
      }
    }

    svg {
      position: relative;
      top: 0px;
      right: 4px;
    }
  }

  .rating-avg {
    margin-right: 2px;

    .rating-avg-text {
      color: $tpBlue2;
    }
  }

  .star-full {
    color: rgb(196, 166, 0);
  }

  .high-rating {
    color: gold;
    text-shadow: 0px 0px 2px #5458f7;
  }

  .details {
    margin-left: 7.5px;
    margin-right: 7.5px;
    p.title {
      padding-left: 5px;
      margin: 0;
      font-weight: bold;
      color: $tpBlue1;
      // overflow-wrap: break-word;
      text-overflow: ellipsis;

      /* Required for text-overflow to do anything */
      white-space: nowrap;
      overflow: hidden;
    }

    p.tags {
      display: inline-block;
      padding: 3px;
      margin: 3px;
      font-size: rem(12px);
      color: $tpPink2;
      background: #e0a2ec1c;
      border-radius: 5px;
    }

    p.desc {
      margin: 0px;
      padding: 5px;
      font-size: rem(12px);
      color: #9597a1;

      /* Required for text-overflow to do anything */
    }
  }
}
hr {
  border: 0.75px solid #f2f2f2;
  width: 90%;
  margin: 5px auto;
}
footer {
  @include flexCustom(space-between, center, row);
  padding: rem(10px);

  .wrapper {
    @include flexCustom(space-between, center, row);

    button {
      margin-right: 3px;
      outline: none;
    }

    span {
      font-size: rem(10px);
      font-weight: 600;
      transition: color 0.2s;
    }

    & button:hover + span {
      color: #5458f7;
    }
  }

  .btn-goToDetails {
    @include btnActionGrey;
    font-size: rem(14px);
    margin: 0 auto;
    width: 80%;
  }
}

button {
  @include flexCenter(row);
  @include btnRound(32px);
  border: 0;
  outline: none;
  background: #f5f5f6;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #eeefff;
  }

  svg {
    fill: #9597a1;
    transition: fill 0.2s;
  }

  &:hover svg {
    fill: #5458f7;
  }
}

.marked {
  box-shadow: 0 1px 15px black;
}
</style>