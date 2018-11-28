import Vue from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places',
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
