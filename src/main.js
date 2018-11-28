import Vue from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
import VCalendar from 'v-calendar'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

 
Vue.use(Buefy);

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
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
