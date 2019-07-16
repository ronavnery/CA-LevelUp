<template>
  <section class="user-dashboard-header">
    <div class="icon-container">
      <i class="fas fa-envelope"></i>
      <i class="fas fa-bell"></i>
      <i class="fas fa-user" @click="toggleNav"></i>
    </div>
    <nav>
      <ul class="user-commands clean-list">
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
  methods: {
    async doLogout() {
      try {
        const res = await this.$store.dispatch({ type: "doLogout" });
        console.log(res);
        this.$router.push("/");
      } catch (err) {
        console.log("Couldnt log out, got err:", err);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.user-dashboard-header {
  position: relative;
  display: flex;
  height: 100%;
}

.icon-container {
  width: 100.25px;
  @include flexCustom(space-around, center, row);

  i {
    color: #d0c9d6;
  }
}

ul {
  position: absolute;
  top: 100%;
  right: calc(0px - 10px);
  width: calc(100% + 10px);
}
</style>
