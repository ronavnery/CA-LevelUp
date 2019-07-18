import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './registerServiceWorker'
import VueCarousel from 'vue-carousel';
import VueMasonry from 'vue-masonry-css'
 
Vue.use(VueMasonry);
Vue.use(VueCarousel);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
