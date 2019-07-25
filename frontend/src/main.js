import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './registerServiceWorker'
import VueCarousel from 'vue-carousel';
import VueMasonry from 'vue-masonry-css';
import VueTyperPlugin from 'vue-typer';
import * as VueGoogleMaps from 'vue2-google-maps'
import {VueSpinners} from '@saeris/vue-spinners';


Vue.use(VueTyperPlugin)
Vue.use(VueMasonry);
Vue.use(VueCarousel);
Vue.use(require('vue-moment'));
Vue.use(VueSpinners);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAmsVJlq870Mn6SV5kjYlGRR5ssyKxVw58',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
