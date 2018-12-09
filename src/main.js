import Vue from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
import VCalendar from 'v-calendar'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import StarRating from 'vue-star-rating'


Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(Buefy);

Vue.component('star-rating', StarRating);

const SOCKET_URL = process.env.NODE_ENV !== 'development'
  ? ''
  : '//localhost:3000'

Vue.use(new VueSocketIO({
    debug: true,
    connection: SOCKET_URL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB6n7iEYMeOq1PxgcjFtjgKLiuUA5_Oc20',
    language: 'en',
    libraries: 'places',
  },
})

Vue.use(VCalendar, {
  formats: {
    title: 'MMMM YYYY',
    weekdays: 'W',
    navMonths: 'MMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L',
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')


