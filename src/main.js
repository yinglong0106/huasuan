// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios' // http.js文件，即全局配置axios请求，与main.js在同级目录
import Qs from 'qs'
import picker from 'vue-3d-picker'
import BaiduMap from 'vue-baidu-map'
import BScroll from 'better-scroll'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import Local from '@/library/local'
import Vuex from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui';
import VueTouch from 'vue-touch'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Vuex)
Vue.use(Local)
Vue.component(picker.name, picker)
Vue.use(VueAwesomeSwiper)
Vue.use(MintUI);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'DwUrm4OX62qaGdlN8or9u1IeMMavFOSP'
})

Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.axios = axios
Vue.prototype.qs = Qs
axios.defaults.withCredentials = true

axios.defaults.baseURL = 'https://m.xmctime.com/hsapi'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
