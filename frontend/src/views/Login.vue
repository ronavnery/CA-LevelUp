<template>
  <main class="login-container">
    <section class="form-elegant w-auto p-5">
      <mdb-row class="form-container">
        <mdb-col md="5">
          <mdb-card class="form-card">
            <mdb-card-body class="mx-3">
              <div class="text-center">
                <h3 class="dark-grey-text mb-4">
                  <strong>Login</strong>
                </h3>
              </div>
              <mdb-input label="Your Nickname" type="text" v-model="credentials.nickName" />
              <mdb-input
                label="Your password"
                type="password"
                containerClass="mb-0"
                v-model="credentials.password"
              />
              <p v-if="failedLoginTxt" class="font-large red-text d-flex justify-content-start pb-1">
                {{failedLoginTxt}}
              </p>
              <p class="font-small blue-text d-flex justify-content-end pb-1">
                Forgot
                <a href="#" class="blue-text ml-1">Password?</a>
              </p>
              <div class="text-center mb-2">
                <mdb-btn
                  gradient="blue"
                  rounded
                  class="btn-block z-depth-1a"
                  @click="loginUser"
                >Login</mdb-btn>
              </div>
              <!-- <p
                class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-1"
              >or Login with:</p>
              <div class="row my-1 d-flex justify-content-center">
                <mdb-btn type="button" color="white" rounded class="mr-md-1 z-depth-1a">
                  <mdb-icon fab icon="facebook" class="blue-text text-center" />
                </mdb-btn>
                <mdb-btn type="button" color="white" rounded class="z-depth-1a">
                  <mdb-icon fab icon="google-plus" class="blue-text" />
                </mdb-btn>
              </div> -->
            </mdb-card-body>
            <mdb-modal-footer class="mx-3 pt-3 mb-0">
              <p class="font-small grey-text d-flex justify-content-end">
                Not a member?
                <router-link to="/sign-up" class="blue-text ml-1">Sign Up</router-link>
              </p>
            </mdb-modal-footer>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
  </main>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbInput,
  mdbBtn,
  mdbModalFooter
} from "mdbvue";

export default {
  name: "login",
  data() {
    return {
      credentials: {
        nickName: "",
        password: "",
        showModal: false,
      },
      failedLoginTxt: ''
    };
  },

  methods: {
    async loginUser() {
      try {
        const res = await this.$store.dispatch({
          type: "doLogin",
          credentials: this.credentials
        });
        if (!res) {
          console.log("no user found", res);
        } else this.$router.push("/explore");
      } catch (err) {
        this._handleErr(err)
      }
    },
    _handleErr(err) {
      this.failedLoginTxt = err;
    }
  },

  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbModalFooter
  }
};
</script>

<style scoped lang="scss">
.login-container {
  height: calc(100vh - 50px);
  background-image: url("../assets/backgrounds/login-main.jpg");
  background-size: cover;
}
.form-container {
  @include flexCenter(row);
  margin: 0;
}

.form-card {
  background: rgba(255, 255, 255, 0.8);
}
.form-elegant .font-small {
  font-size: 0.8rem;
}

.form-elegant .z-depth-1a {
  box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26),
    0 4px 12px 0 rgba(121, 155, 254, 0.25);
}

.form-elegant .z-depth-1-half,
.form-elegant .btn:hover {
  box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28),
    0 4px 15px 0 rgba(36, 133, 255, 0.15);
}
</style>
