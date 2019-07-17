<template>
  <section @click="goToDetails" class="offer-preview" v-if="offer">
    <header>
      <i :class="categoryIcon"></i>
      <span>{{offer.category}}</span>
      <button @click.stop="goToEdit">
        <svg height="12" width="12" viewBox="0 -1 401.52289 401">
          <path
            d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"
          />
          <path
            d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"
          />
        </svg>
      </button>
      <button @click.stop="removeOffer">
        <svg height="12" width="12" viewBox="-40 0 427 427.00131">
          <path
            d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
          />
          <path
            d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
          />
          <path
            d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
          />
          <path
            d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
          />
        </svg>
      </button>
    </header>
    <main>
      <img :src="offer.imgs[0]" alt />
      <div class="user-date-starred-container">
        <div class="wrapper">
          <img :src="offer.createdBy.imgUrl" alt />
          <span>{{offer.createdBy.nickName}}</span>
        </div>
        <svg viewBox="-1 -1 108.99999999999991 109.04511627906979" width="20" height="20">
          <defs>
            <path
              d="M56.8 0.17L58.92 0.39L61.01 0.69L63.08 1.07L65.11 1.53L67.11 2.07L69.09 2.68L71.02 3.37L72.93 4.13L74.79 4.96L76.62 5.87L78.4 6.84L80.15 7.87L81.84 8.98L83.5 10.14L85.1 11.36L86.66 12.65L88.16 13.99L89.62 15.39L91.01 16.84L92.36 18.35L93.64 19.91L94.86 21.51L96.03 23.17L97.13 24.86L98.17 26.61L99.14 28.39L100.04 30.22L100.87 32.09L101.63 33.99L102.32 35.93L102.94 37.9L103.47 39.91L103.93 41.94L104.31 44.01L104.61 46.1L104.83 48.22L104.96 50.36L105 52.52L104.96 54.69L104.83 56.83L104.61 58.95L104.31 61.04L103.93 63.1L103.47 65.14L102.94 67.14L102.32 69.12L101.63 71.06L100.87 72.96L100.04 74.82L99.14 76.65L98.17 78.44L97.13 80.18L96.03 81.88L94.86 83.53L93.64 85.14L92.36 86.7L91.01 88.2L89.62 89.65L88.16 91.05L86.66 92.4L85.1 93.68L83.5 94.91L81.84 96.07L80.15 97.17L78.4 98.21L76.62 99.18L74.79 100.08L72.93 100.91L71.02 101.68L69.09 102.37L67.11 102.98L65.11 103.52L63.08 103.98L61.01 104.36L58.92 104.66L56.8 104.87L54.66 105L52.5 105.05L50.34 105L48.2 104.87L46.08 104.66L43.99 104.36L41.92 103.98L39.89 103.52L37.89 102.98L35.91 102.37L33.98 101.68L32.07 100.91L30.21 100.08L28.38 99.18L26.6 98.21L24.85 97.17L23.16 96.07L21.5 94.91L19.9 93.68L18.34 92.4L16.84 91.05L15.38 89.65L13.99 88.2L12.64 86.7L11.36 85.14L10.14 83.53L8.97 81.88L7.87 80.18L6.83 78.44L5.86 76.65L4.96 74.82L4.13 72.96L3.37 71.06L2.68 69.12L2.06 67.14L1.53 65.14L1.07 63.1L0.69 61.04L0.39 58.95L0.17 56.83L0.04 54.69L0 52.52L0.04 50.36L0.17 48.22L0.39 46.1L0.69 44.01L1.07 41.94L1.53 39.91L2.06 37.9L2.68 35.93L3.37 33.99L4.13 32.09L4.96 30.22L5.86 28.39L6.83 26.61L7.87 24.86L8.97 23.17L10.14 21.51L11.36 19.91L12.64 18.35L13.99 16.84L15.38 15.39L16.84 13.99L18.34 12.65L19.9 11.36L21.5 10.14L23.16 8.98L24.85 7.87L26.6 6.84L28.38 5.87L30.21 4.96L32.07 4.13L33.98 3.37L35.91 2.68L37.89 2.07L39.89 1.53L41.92 1.07L43.99 0.69L46.08 0.39L48.2 0.17L50.34 0.04L52.5 0L54.66 0.04L56.8 0.17ZM22.5 43.05L37.5 58.42L33.96 80.13L52.5 69.88L71.04 80.13L67.5 58.42L82.5 43.05L61.77 39.88L52.5 20.13L43.23 39.88L22.5 43.05Z"
              id="ePTjNw34i"
            />
          </defs>
          <use xlink:href="#ePTjNw34i" opacity="1" :fill="starIconFill" fill-opacity="1" />
        </svg>
      </div>

      <div class="details">
        <p class="title">{{shortTitle}}</p>
        <p class="desc">{{shortDesc}}</p>
        <p v-for="tag in offer.tags" :key="tag" class="tags">{{tag}}</p>
      </div>
    </main>
    <hr />
    <footer>
      <div class="wrapper">
        <button class="like" @click.stop>
          <svg viewBox="0 0 478.2 478.2" width="16px" height="16px">
            <path
              d="M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5
		c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1
		c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7
		c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61
		c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3
		c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3
		c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1
		c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4
		c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8
		c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2
		c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9
		c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7
		c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3
		c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3
		C444.875,295.3,440.675,304.4,431.975,313.4z"
            />
          </svg>
        </button>
        <span>{{this.offer.interested.length}}</span>
      </div>
      <div class="wrapper">
        <button class="comment" @click.stop>
          <svg width="16" height="16" viewBox="0 0 612 612">
            <path
              d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25
				c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75
				c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125
				S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612
				l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z
				 M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75
				c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"
            />
          </svg>
        </button>
        <!-- <span>{{this.offer.comments.length}}</span> -->
      </div>

      <!-- <button class="details">
        <svg
          enable-background="new 0 0 26 26"
          width="16"
          height="16"
        >
          <path
            d="M16.7,22.7l9-9c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7l-9-9C16.5,3.1,16.3,3,16,3s-0.5,0.1-0.7,0.3l-1.4,1.4  c-0.4,0.4-0.4,1,0,1.4l4,4c0.3,0.3,0.1,0.9-0.4,0.9H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h16.6c0.4,0,0.7,0.5,0.4,0.9l-4,4  c-0.4,0.4-0.4,1,0,1.4l1.4,1.4c0.2,0.2,0.4,0.3,0.7,0.3C16.3,23,16.5,22.9,16.7,22.7z"
          />
        </svg>
      </button>-->
      <button class="share" @click.stop>
        <svg viewBox="0 0 481.6 481.6" height="16" width="16">
          <g>
            <path
              d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8
		c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5
		l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9
		l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1
		c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8
		c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5
		c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"
            />
          </g>
        </svg>
      </button>
    </footer>
  </section>
</template>









<script>
export default {
  name: "OfferPreview",
  props: {
    offer: {
      type: Object
    }
  },
  methods: {
    goToDetails() { 
      this.$router.push({
        name: "Profile",
        params: {
          nickName: this.offer.createdBy.nickName,
          offerId: this.offer._id
        }
      });
      // this.$router.push(`profile/${this.offer.createdBy.nickName}/${this.offer._id}`);
    },
    goToEdit() {
      this.$router.push(`profile/edit/${this.offer._id}`);
    },
    removeOffer() {
      this.$emit("removeOffer", this.offer._id);
    }
  },
  computed: {
    starIconFill() {
      if (this.offer.stars >= 4) return "#ffbf00";
      else if (this.offer.stars < 4 && this.offer.stars >= 3) return "#ffcf40";
      else if (this.offer.stars < 3 && this.offer.stars >= 2) return "#ffdc73";
      return "#8e8b80";
    },
    shortDesc() {
      if (this.offer.description.length > 60) {
        return this.offer.description.substring(0, 60) + "...";
      }
      return this.offer.description;
    },
    shortTitle() {
      if (this.offer.title.length > 60) {
        return this.offer.title.substring(0, 60) + "...";
      }
      return this.offer.title;
    },
    categoryIcon() {
      if (this.offer.category === "Development") return "fas fa-file-code";
      else if (this.offer.category === "Business") return "fas fa-briefcase";
      else if (this.offer.category === "Finance & Accounting")
        return "fas fa-balance-scale";
      else if (this.offer.category === "Office Productivity")
        return "fas fa-mail-bulk";
      else if (this.offer.category === "Personal Development")
        return "fas fa-user-plus";
      else if (this.offer.category === "Design") return "fas fa-pencil-ruler";
      else if (this.offer.category === "IT & Software") return "fas fa-sitemap";
      else if (this.offer.category === "Marketing") return "fas fa-ad";
      else if (this.offer.category === "Lifestyle") return "fas fa-gamepad";
      else if (this.offer.category === "Photography")
        return "fas fa-camera-retro";
      else if (this.offer.category === "Health & Fitness")
        return "fas fa-running";
      else if (this.offer.category === "Music") return "fas fa-guitar";
      else if (this.offer.category === "Teaching & Academics")
        return "fas fa-user-graduate";
    }
  }
};
</script>





<style scoped lang="scss">
.offer-preview {
  @include flexCustom(space-between, stretch, column);
  width: rem(250px);
  background: $tpWhite;
  border-radius: 5px;
  cursor: pointer;
}
header {
  @include flexCustom(flex-start, center, row);
  min-height: 40px;

  i {
    font-size: rem(20px);
    margin-left: 8px;
    color: $btnBlue1;
  }

  span {
    color: $tpPurple;
    line-height: 1px;
    margin-left: 6px;
    font-size: rem(12px);
  }

  button {
    width: 25px;
    height: 25px;
    margin: 3px;
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

  .details {
    p.title {
      padding-left: 5px;
      margin: 0;
      font-weight: bold;
      color: #383838;
      overflow-wrap: break-word;
    }

    p.tags {
      display: inline-block;
      padding: 5px;
      margin: 3px;
      font-size: rem(12px);
      color: #e977ff;
      background: #e0a2ec3d;
      border-radius: 5px;
    }

    p.desc {
      margin: 0px;
      padding: 5px;
      font-size: rem(12px);
      color: #9597a1;
    }
  }
}
hr {
  border: 0.75px solid #f2f2f2;
  width: 90%;
}
footer {
  @include flexCustom(space-around, center, row);
  padding-bottom: rem(10px);

  .wrapper {
    @include flexCustom(space-between, center, row);

    button {
      margin-right: 3px;
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
}

button {
  @include flexCenter(row);
  @include btnRound(32px);
  border: 0;
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
</style>