import userService from '../services/userService.js';

export default {
    state: {
        user: null
    },
    getters: {
        loggedInUser: state => state.user
    },
    mutations: {
        setUser(state, { loggeduser }) {
            state.user = loggeduser
        },
        logout(state) {
            state.user = null
            sessionStorage.clear()
        },
        userBeds(state, { userBeds }) {
            console.log('BBBB', userBeds);
        }
    },
    actions: {
        checkLogin({ commit }, { user }) {
            return userService.getUserLoggedIn(user.email, user.pass)
                .then(loggeduser => commit({ type: 'setUser', loggeduser }))
        },
        addUser({ commit }, { user }) {
            userService.addUser(user)
                .then(loggeduser => commit({ type: 'setUser', loggeduser }))
        },
        getUserLoggedIn({ commit }, { user }) {
            userService.getUserLoggedIn(user.email, user.pass)
                .then(loggeduser => console.log('user', loggeduser))
        },
        getUserById({ commit }, { userId }) {
            return userService.getUserById(userId)
                .then(user => user)
        },
        getUserBeds({ commit }, { userId }) {
            return userService.getUserBeds(userId)
                .then(userBeds => commit.setUserBeds)
        },
        saveUser({ commit }, { user }) {
            userService.saveUser(user.id, user)
                .then(user => commit.user)
        },
        reconnectUser({ commit }, { loggeduser }) {
            commit({ type: 'setUser', loggeduser: JSON.parse(loggeduser) })
        },
        logout({ commit }) {
            commit({ type: "logout" })
        }
    }
}
