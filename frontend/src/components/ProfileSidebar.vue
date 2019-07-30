<template>
  <section class="sidebar-container">
    <section class="sidebar-content">
      <div class="img-btns-wrapper">
        <img class="profile-img" :src="profile.imgUrl" @click="goToProfile" />
        <div class="btn-container" v-if="!isOnAboutPage">
          <button class="share">
            <i class="fas fa-share-alt"></i>
          </button>
          <div class="wrapper">
            <button class="star">
              <i class="fas fa-star"></i>
            </button>
            <span>4.8</span>
          </div>
          <button v-if="connectedUser" class="message">
            <router-link :to="'/profile/' + connectedUser.nickName + '/inbox'">
              <i class="fas fa-envelope"></i>
            </router-link>
          </button>
        </div>
      </div>
      <span class="name fs20" @click="goToProfile">{{profile.name}}</span>
      <span class="city fs14">{{profile.city}}</span>
      <br />
      <br />
      <span class="city fs12">{{profile.intro}}</span>
      <router-link
        class="city fs12"
        v-if="isUser"
        :to="'/profile/' + connectedUser.nickName + '/edit'"
      >Edit this profile</router-link>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object
    }
  },

  methods: {
    goToProfile() {
      this.$router.push(`/profile/${this.profile.nickName}`);
    }
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    isOnAboutPage() {
      return this.$route.path.includes("about");
    },
    isUser() {
      return (this.connectedUser && this.connectedUser._id === this.profile._id);
    }
  }
};
</script>


<style scoped lang="scss">
.sidebar-container {
  height: 100%;
  min-width: 300px;
  background: $tpPink;
  color: $tpGray;
  box-shadow: 11px 2px 26px -10px rgba(0, 0, 0, 0.75);
  position: relative;
}


.sidebar-content {
  @include flexCustom(space-between, center, column);
  height: 50%;
  padding: rem(40px);
  position: sticky;
  top: 50px;
}

.img-btns-wrapper {
  margin-bottom: 40px;
  min-height: 153px;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.name {
  cursor: pointer;
}

.btn-container {
  position: relative;
  width: 150px;
  @include flexCustom(space-between, center, row);
  top: -35px;

  button {
    background-color: $tpPink;
    @include btnRound(40px);
    font-size: rem(16px);
    color: white;
    font-weight: 300;
    transition: background-color 0.2s, color 0.2s;
    outline: none;
  }

  button.share,
  button.message {
    cursor: pointer;
  }

  button.share:hover,
  button.message:hover {
    background-color: white;
    color: $tpPink;
  }

  .wrapper {
    position: absolute;
    left: 50%;
    top: 110%;
    transform: translate(-50%, -50%);
    @include flexCenter(column);

    span {
      display: inline-block;
      font-size: rem(10px);
      margin-top: -8px;
    }
  }
}
</style>
