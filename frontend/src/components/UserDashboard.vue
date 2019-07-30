<template>
  <section class="user-dashboard-header">
    <button class="btn-add-offer" @click="addOffer">Share a skill</button>
    <div class="icon-container">
      <div class="inbox">
        <router-link :to="'/profile/' + currUser.nickName + '/inbox'">
          <div class="notification" v-if="unreadMsgs">{{unreadMsgs}}</div>
          <i class="fas fa-envelope"></i>
        </router-link>
      </div>
      <!-- <i class="fas fa-user" @click="toggleNav"></i> -->
      <img class="user-small-img" :src="currUser.imgUrl" @click="toggleNav" />
    </div>
    <nav class="user-actions-nav" v-if="showNav">
      <ul class="user-commands clean-list">
        <li class="li-user">
          <p>{{currUser.name}}</p>
        </li>
        <li>
          <router-link :to="'/profile/' + currUser.nickName">Go to profile</router-link>
          </li>
        <li>
          <button class="logout-btn" @click.stop="doLogout">Logout</button>
        </li>
      </ul>
    </nav>
  </section>
</template>


<script>
import io from "socket.io-client";

export default {
  props: {
    currUser: {
      type: Object
    }
  },
  data() {
    return {
      showNav: false,
      socket: process.env.NODE_ENV === 'production' ? io(''):io("localhost:3000")
    };
  },

  mounted() {
    this.socket.emit("JOIN_ROOM", this.currUser._id);
    this.socket.on("notify", () => this.addNotification());
    this.socket.on("req-sent", booking =>
      this.$store.commit({ type: "addBooking", booking })
    );
    this.socket.on("booking-updated", booking =>
      this.$store.commit({type: 'updateBooking',booking}))
  },

  computed: {
    unreadMsgs() {
      return this.$store.getters.unreadMsgs;
    }
  },
  methods: {
    async doLogout() {
      try {
        await this.$store.dispatch({ type: "doLogout" });
        this.$router.push("/");
      } catch (err) {
        console.log("Couldnt log out, got err:", err);
      }
    },
    addNotification() {
      this.$store.commit({ type: "addNotification" });
    },
    addOffer() {
      this.$router.push("/edit");
    },
    toggleNav() {
      this.showNav = !this.showNav;
    }
  },
};
</script>


<style lang="scss" scoped>


.user-dashboard-header {
  @include flexCustom(space-between, center, row);
  width: 190px;
  @include for-normal-layout {
    width: 210px;
  }
}
.inbox {
  position: relative;
  font-size: 16px;
  div {
    position: absolute;
    color: white;
    background: red;
    height: 0.8rem;
    width: 0.8rem;
    font-size: 0.6rem;
    top: 9px;
        left: 10px;
    @include flexCenter(row);
    border-radius: 50%;

    // top: 10px;
    // left: 50%;
    // transform: translateX(-50%);
  }
}


.icon-container {
  width: 70.25px;
  @include flexCustom(space-around, center, row);

  i {
    color: $tpGray;
    cursor: pointer;
  }

  .user-small-img {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 0.5px solid white;
    cursor: pointer;
    background: $tpGray;
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
.logout-btn {
  @include btnActionGreySm
}
.user-actions-nav {
  border-radius: 4px;
  padding: 10px;
  background: rgba(193, 87, 214, 0.7)
}

.btn-add-offer {
  @include btnActionWhiteSm;
  color: white;
  font-size: rem(14px);
}
</style>
