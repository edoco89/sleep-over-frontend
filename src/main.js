import Vue from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
