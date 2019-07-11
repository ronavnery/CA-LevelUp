import Vue from 'vue'
import Vuex from 'vuex'
import offerStore from './modules/offerStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { 
    offerStore
  }
})

