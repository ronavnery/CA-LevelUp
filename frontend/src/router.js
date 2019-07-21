import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import OfferEdit from './views/OfferEdit.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import ProfileDetails from './components/ProfileDetails.vue'
import ProfileOffers from './components/ProfileOffers'
import OfferDetails from './components/OfferDetails'
import ProfileEdit from './views/ProfileEdit.vue';
import SignUp from './views/SignUp.vue'
import Inbox from './views/Inbox.vue'

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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: 'edit/:_id?',
          name: 'OfferEdit',
          component: OfferEdit
        },
        {
          path: ':nickName',
          name: 'ProfileDetails',
          component: ProfileDetails
        },
        {
          path: ':nickName/edit',
          name: 'ProfileEdit',
          component: ProfileEdit
        },
        {
          path: ':nickName/inbox',
          name: 'Inbox',
          component: Inbox
        },
        {
          path: ':nickName/offers',
          name: 'ProfileOffers',
          component: ProfileOffers
        },
        {
          path: ':nickName/:offerId?',
          name: 'OfferDetails',
          component: OfferDetails
        },
      ]
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
