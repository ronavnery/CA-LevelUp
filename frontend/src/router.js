import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import OfferDetails from './views/OfferDetails.vue'
import OfferEdit from './views/OfferEdit.vue'
import SignIn from './views/SignIn.vue'

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
    {
      path: '/explore/:_id',
      name: 'OfferDetails',
      component: OfferDetails
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
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
