// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import * as flexable from './assets/js/flexible'
import Rx from 'rxjs/Rx'
import Swiper from 'swiper'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css';

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(MintUi)
// Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
