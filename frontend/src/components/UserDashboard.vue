<template>
  <section class="user-dashboard-header">
    <button class="btn-add-offer" @click="addOffer">Share Your Skill</button>
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
  width: 260px;
  z-index: 100;
  background: #1c2129;
  color: white;
  box-shadow: 0px 0px 3px black;

  li {
    @include flexCustom(center, center, row);
  }

  li:first-child {
    height: 80px;
  }

  li > p {
    margin: 0;
    font-size: 1.5rem;
  }
}

.btn-add-offer {
  @include btnActionSm;
}
</style>
