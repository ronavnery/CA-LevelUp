<template>
  <section class="sign-up-page">
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
  </section>
</template>

<script>
import _ from 'lodash.debounce';

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
                ratingAvg: 0
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
        }
    },
    computed: {
        passwordsMatch() {
            if (this.newUser.password !== this.confirmPassword) return 'pass-not-match';
            return 'pass-match';
        }
    }
}
</script>

