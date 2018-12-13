import userService from '../services/userService.js';
import { socketEmitter } from '../services/socketEmitService'

export default {
    state: {
        user: null,
        newBookRequest: 0
    },
    getters: {
        loggedInUser: state => state.user,
        newBookRequestCount: state => state.newBookRequest
    },
    mutations: {
        setUser(state, { loggeduser }) {
            state.user = loggeduser
        },
        //NOT IN USE CURRENTLY- WAITING FOR INTEGRATE
        setUserHostBeds(state, { hostBeds }) {
            state.user.hostBeds = hostBeds
        },
        setNewBookRequest(state, { number }) {
            state.newBookRequest = number;
        }
    },
    actions: {
        checkLogin({ commit, dispatch }, { user }) {
            return userService.getUserLoggedIn(user.email, user.password)
                .then(loggeduser => {
                    if(!loggeduser) return
                    commit({ type: 'setUser', loggeduser })
                    dispatch({type: "getChatsById",userId: loggeduser._id});
                    socketEmitter.$socket.emit('loggedIn', loggeduser._id)
                })
        },
        addUser({ commit }, { user }) {
            return userService.addUser(user)
                .then(loggeduser => {
                    if(!loggeduser) return
                    commit({ type: 'setUser', loggeduser })
                    dispatch({type: "getChatsById",userId: loggeduser._id});
                    socketEmitter.$socket.emit('loggedIn', loggeduser._id)
                })
        },
        //WORKS. NOT IN USE CURRENTLY
        getUserById({ commit }, { id }) {
            return userService.getUserById(id)
                .then(user => {
                    return user
                })
            // .then(user => user)
        },
        //TO BE CONTINUED
        saveUser({ commit }, { user }) {
            userService.saveUser(user, user._id)
                .then(loggeduser => commit({ type: 'setUser', loggeduser }))
        },
        addUserBed({ commit }, { savedBed }) {
            userService.saveUser(user.id, user)
                .then(user => commit.user)
        },
        //WORKS. NOT IN USE CURRENTLY
        queryUsers({ commit }) {
            userService.query()
                .then(users => console.log(users))
        },
        //WORKS. NOT IN USE CURRENTLY
        removeUser({ commit }, { id }) {
            userService.removeUser(id)
                .then(() => console.log('removed successfuly'))
        },
        //INTEGRATE WITH BEDS
        getUserBeds({ commit }, { userId }) {
            return userService.getUserBeds(userId)
                .then(userBeds => commit.setUserBeds)
        },
        //DONT USE SERVICE
        reconnectUser({ commit }, { loggeduser }) {
            const loggedInUser = JSON.parse(loggeduser);
            commit({ type: 'setUser', loggeduser: loggedInUser })
            socketEmitter.$socket.emit('loggedIn', loggedInUser._id)
        },
        SOCKET_requestId({ getters }) {
            console.log('inside requestId')
            if (!getters.loggedInUser) return
            socketEmitter.$socket.emit('loggedIn', getters.loggedInUser._id)
        },
        SOCKET_getBookRequest({commit}, {hostBeds}){
            commit({ type: 'setUserHostBeds', hostBeds })
        },
        SOCKET_setNewBookRequest({ commit }, { number }) {
            commit({ type: 'setNewBookRequest', number })
        },
    },
}
