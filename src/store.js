import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user.js'
import bedModule from './modules/bed.js'
import chatModule from './modules/chat.js'
import userService from './services/userService.js'
import { socketEmitter } from './services/socketEmitService'



Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    bedModule,
    userModule,
    chatModule
  },
  mutations: {
    logout(state) {
      userModule.state.user = null
      chatModule.state.userChats = []
      chatModule.state.currChat = {}
      chatModule.state.newMsgPerChat = {}
      chatModule.state.newMsg =  0
      bedModule.state.beds = []
      bedModule.state.currBed = null
      bedModule.state.place = {}
      sessionStorage.clear()
    },
  },
  actions: {
    logout({ commit }) {
      userService.logout()
      commit({ type: "logout" })
      socketEmitter.$socket.emit('loggedOut')
    }
  }
})
