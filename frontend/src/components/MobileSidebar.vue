<template>
  <transition name="fade" mode="out-in">
    <section>
      <div class="side-bar-overlay" @click="emitToggleSidebar" v-if="showSidebar"></div>
      <section class="side-bar-container" v-if="showSidebar">
        <div class="connected-user-details">
          <div class="user-img" :style="userImg(connectedUser.imgUrl)"></div>
          <div class="user-name-city">
            <p>{{connectedUser.name}}</p>
            <span>{{connectedUser.city}}</span>
          </div>
        </div>
        <nav>
          <ul class="clean-list navigation">
            <li>
              <router-link to="/" exact>
                <i class="fas fa-home"></i>
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <router-link to="/explore">
                <i class="fas fa-users"></i>
                <span>Explore</span>
              </router-link>
            </li>
            <li>
              <router-link to="/map">
                <i class="fas fa-map-marked-alt"></i>
                <span>Map</span>
              </router-link>
            </li>
            <li>
              <router-link :to="'/profile/' + connectedUser.nickName + '/inbox'">
                <i class="fas fa-envelope"></i>
                <span>Inbox</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about">
                <i class="fas fa-info-circle"></i>
                <span>About</span>
              </router-link>
            </li>
          </ul>
        </nav>
        <ul class="clean-list actions" v-if="connectedUser.name !== 'Visitor'">
          <li>
            <router-link :to="'/profile/' + connectedUser.nickName" exact>
              <i class="fas fa-user-alt"></i>
              <span>Go To My Profile</span>
            </router-link>
          </li>
          <li>
            <router-link :to="'/profile/' + connectedUser.nickName + '/edit'">
              <i class="fas fa-user-edit"></i>
              <span>Edit My Details</span>
            </router-link>
          </li>
          <li>
            <router-link to="/edit">
              <i class="fas fa-plus-circle"></i>
              <span>Share A Skill</span>
            </router-link>
          </li>
          <li class="logout">
            <button @click.stop="doLogout">
              <i class="fas fa-power-off"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
        <ul class="clean-list actions" v-else>
          <li>
            <router-link to="/login" exact>
              <i class="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sign-up" exact>
              <i class="fas fa-user-plus"></i>
              <span>Sign-Up</span>
            </router-link>
          </li>
        </ul>
      </section>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    showSidebar: {
      type: Boolean,
      default: false
    },
    connectedUser: {
      type: Object,
      default: () => {
        return {
          imgUrl:
            "http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png",
          name: "Visitor",
          city: ""
        };
      }
    }
  },
  methods: {
    userImg(url) {
      return {
        "background-image": `url(${url})`,
        "background-size": "cover",
        "background-position": "center",
        "object-fit": "cover",
        "background-color": "white"
      };
    },
    async doLogout() {
      try {
        await this.$store.dispatch({ type: "doLogout" });
        this.emitToggleSidebar();
        this.$router.push("/");
      } catch (err) {
        console.log("Couldnt log out, got err:", err);
      }
    },
    emitToggleSidebar() {
      // console.log('watched route');
      this.$emit("toggle-me");
    },
    test(ev) {
      console.log(ev.target);
    }
  },
  watch: {
    $route: {
      handler() {
        if (!this.showSidebar) return;
        this.emitToggleSidebar();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.side-bar-overlay {
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 998;
  height: calc(100vh - 50px);
  width: 100vw;
  background: rgba(0, 0, 0, 0.527);
}

.side-bar-container {
  @include flexCustom(flex-start, stretch, column);
  position: fixed;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  width: 250px;
  background: #220f41e8;
  color: white;
  z-index: 999;
  @include for-normal-layout {
    display: none;
  }
}

.connected-user-details {
  height: 70px;
  padding: 10px 8px;
  @include flexCustom(center, stretch, column);
  flex-wrap: wrap;
  margin-bottom: 10px;

  .user-img {
    @include btnRound(50px);
    box-shadow: inset 0 0 2px 0px #282828;
  }
  .user-name-city {
    width: calc(100% - 70px);
    p {
      margin: 0;
      font-size: 20px;
      font-family: $HanGroBlack;
    }
    span {
      color: rgba(255, 255, 255, 0.829);
    }
  }
}

ul.clean-list {
  h4 {
    margin: 0 8px;
    border-bottom: 1px solid #ffffff61;
    width: calc(100% - 16px);
  }
  margin-bottom: 10px;
  li {
    height: 40px;
    font-size: 16px;
  }
  a {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0 20px;
    background: transparent;
  }

  a.router-link-exact-active {
    color: lightgreen;
  }
  i {
    margin-right: 10px;
  }
  button {
    color: white;
    height: 100%;
    border: none;
  }
}

ul:first-child {
  margin-bottom: 25px;
  padding-bottom: 25px;
  position: relative;
}

ul:first-child::after {
  content: "";
  position: absolute;
  width: 84%;
  height: 0.5px;
  background: grey;
  bottom: 0;
  left: 20px;
}

.logout {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px);
  padding: 0px;
  button {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0px 10px;
    background: transparent;
    outline: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


