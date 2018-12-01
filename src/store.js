import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user.js'
import bedModule from './modules/bed.js'
import chatModule from './modules/chat.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    bedModule,
    userModule,
    chatModule
  },
  mutations: {
  },
  actions: {
  }
})
