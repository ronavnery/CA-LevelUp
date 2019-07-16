import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import OfferEdit from './views/OfferEdit.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
// import ProfileEdit from './views/ProfileEdit.vue';
import SignUp from './views/SignUp.vue'
 
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/explore/edit/:_id?',
      name: 'OfferEdit',
      component: OfferEdit
    },
    // {
    //   path: '/profile/:nickName/edit',
    //   name: 'ProfileEdit',
    //   component: ProfileEdit
    // },
    {
      path: '/profile/:nickName/:offerId?',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
