<template>
  <!-- <section class="signup-container">
    <form @submit.prevent="registerNewUser">
      <input
        type="text"
        v-model="newUser.name"
        @input="buildNickname()"
        placeholder="Enter Name"
        required
      />
      <input type="text" v-model="newUser.nickName" placeholder="Enter Nickname" required />
      <input type="email" v-model="newUser.email" placeholder="Enter Email" required />
      <input
        type="password"
        v-model="newUser.password"
        placeholder="Enter Password"
        required
        :class="passwordsMatch"
      />
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm Password"
        required
        :class="passwordsMatch"
      />
      <button type="submit">Submit</button>
    </form>
  </section> -->

    <main class="signup-container">
    <section class="form-elegant w-auto p-3">
      <mdb-row class="form-container">
        <mdb-col md="5">
          <mdb-card class="form-card">
            <mdb-card-body class="mx-3">
              <div class="text-center">
                <h3 class="dark-grey-text mb-4">
                  <strong>Sign-up</strong>
                </h3>
              </div>
              <mdb-input label="Name" type="text"  v-model="newUser.name" @input="buildNickname()" required />
              <mdb-input label="Email Address" type="email"  v-model="newUser.email" />
              <mdb-input label="Nickname" type="text"  v-model="newUser.nickName" required />
              <mdb-input label="Password" type="password" containerClass="mb-0" v-model="newUser.password" :class="passwordsMatch" />
              <mdb-input label="Repeat Password" type="password" containerClass="mb-0" v-model="confirmPassword" :class="passwordsMatch" />
              <!-- <p class="font-small blue-text d-flex justify-content-end pb-1">
                Forgot
                <a href="#" class="blue-text ml-1">Password?</a>
              </p> -->
              <div class="text-center mb-2">
                <mdb-btn type="submit" gradient="blue" rounded class="btn-block z-depth-1a" @click="registerNewUser">Sign up</mdb-btn>
              </div>
              <p
                class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-1"
              >or Sign up with:</p>
              <div class="row my-1 d-flex justify-content-center">
                <mdb-btn type="button" color="white" rounded class="mr-md-1 z-depth-1a">
                  <mdb-icon fab icon="facebook" class="blue-text text-center" />
                </mdb-btn>
                <mdb-btn type="button" color="white" rounded class="z-depth-1a">
                  <mdb-icon fab icon="google-plus" class="blue-text" />
                </mdb-btn>
              </div>
            </mdb-card-body>
            <!-- <mdb-modal-footer class="mx-3 pt-3 mb-0">
              <p class="font-small grey-text d-flex justify-content-end">
                Already a member?
                <a class="blue-text ml-1" @click="goToLogin">Login</a>
              </p>
            </mdb-modal-footer> -->
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
  </main>
</template>

<script>
import _ from 'lodash.debounce';
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbInput,
  mdbBtn,
  mdbIcon,
  mdbModal,
  mdbModalBody,
  mdbModalFooter
} from "mdbvue";

export default {
    data() {
        return {
            newUser: {
                name: '',
                nickName: '',
                profileUrl: '',
                email: '', 
                password: '',
                contactInfo: {},
                socialInfo: {},
                imgUrl: '',
                skillTags: [],
                city: '',
                intro: '',
                offers: [],
                interestedIn: [],
                leveledUpIn: [],
                ratingAvg: 0,
                showModal: false
            },
            confirmPassword: ''
        }
    },
    methods: {
        buildNickname: _(function() {
            const nickName = this.newUser.name.split(' ').join('');
            this.newUser.nickName = nickName;
        }, 500),
        async registerNewUser() {
          if (this.newUser.password !== this.confirmPassword) {
            alert('Passwords Do Not Match!')
            return;
          }
          // process.env.NODE_ENV === 'production' ? 
          // this.newUser.profileUrl = '/'

          const user = await this.$store.dispatch({type: 'addUser', newUser: this.newUser})
          this.$router.back();
        },
        goToLogin() {
          this.$router.push('/login')
        }
    },
    computed: {
        passwordsMatch() {
            if (this.newUser.password !== this.confirmPassword) return 'pass-not-match';
            return 'pass-match';
        }
    },
      components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbIcon,
    mdbModal,
    mdbModalBody,
    mdbModalFooter
  }
}
</script>


<style scoped lang="scss">
.signup-container {
  height: calc(100vh - 50px);
  background-image: url("../assets/backgrounds/home-purple.jpg");
  background-size: cover;
}

.form-container {
  @include flexCenter(row);
  margin: 0;
}

.form-card {
  background: rgba(255,255,255,0.8)
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