import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/userStore.js'
import offerStore from './modules/offerStore.js'
import bookingStore from './modules/bookingStore.js'
import chatStore from './modules/chatStore.js'


Vue.use(Vuex)

export default new Vuex.Store({

  modules: { 
    userStore,
    offerStore,
    bookingStore,
    chatStore
  }
})

