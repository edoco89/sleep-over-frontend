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
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io'
import moment from 'moment';
import VueMomentJS from 'vue-momentjs';
 


 
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        store,
    }
}))
Vue.use(VueMomentJS, moment);
Vue.use(ElementUI);
Vue.use(BootstrapVue);
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
  moment,
  render: h => h(app)
}).$mount('#app')
