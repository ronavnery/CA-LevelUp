<template>
  <section class="user-dashboard-header">
          <button class="btn-add-offer" @click="addOffer">Share your Skill</button>
    <div class="icon-container">
      <i class="fas fa-envelope"></i>
      <i class="fas fa-bell"></i>
      <i class="fas fa-user" @click="toggleNav"></i>
    </div>
    <nav v-if="showNav">
      <ul class="user-commands clean-list">
        <li>
            <p>{{currUser.name}}</p>
        </li>
        <li>
          <router-link :to="'/profile/' + currUser.nickName">My Profile</router-link>
        </li>
        <li>
          <button @click.stop="doLogout">Logout</button>
        </li>
      </ul>
    </nav>
  </section>
</template>


<script>
export default {
  props: {
    currUser: {
      type: Object
    }
  },
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    async doLogout() {
      try {
        const res = await this.$store.dispatch({ type: "doLogout" });
        console.log(res);
        this.$router.push("/");
      } catch (err) {
        console.log("Couldnt log out, got err:", err);
      }
    },
    addOffer() {
      this.$router.push("/profile/edit");
    },
    toggleNav() {
      this.showNav = !this.showNav;
    }
  }
};
</script>


<style lang="scss" scoped>
.user-dashboard-header {
  @include flexCustom(space-between, stretch, row);
  width: 250px;
}

.icon-container {
  width: 100.25px;
  @include flexCustom(space-around, center, row);

  i {
    color: #d0c9d6;
    cursor: pointer;
  }
}

nav {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  z-index: 100;

  li:first-child {
      @include flexCustom(center, stretch, row);
  }

  li > p {
      margin: 0;
      font-size: 2rem;
  }
}

.btn-add-offer {
  @include btnActionSm;
}
</style>
