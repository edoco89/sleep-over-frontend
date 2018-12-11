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
      sessionStorage.clear()
    },
  },
  actions: {
    logout({ commit }) {
      userService.logout().then(() => {
        socketEmitter.$socket.emit('loggedOut')
        commit({ type: "logout" })
      }
      )
    }
  }
})
