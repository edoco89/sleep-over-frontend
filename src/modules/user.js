

import userService from '../services/userService.js';

export default {
    state: {
        user: null
    },
    getters: {
        isUserLoggedIn: state => !!state.user._id,
        loggedInUser: state => state.user
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        }
    },
    actions: {
        checkLogin({ commit }, { user }) {
            userService.getUserLoggedIn(user.email, user.pass)
                .then(user => commit.setUser)
        },
        addUser({ commit }, { user }) {
            userService.addUser(user)
                .then(user => commit.setUser)
        },
        getUserLoggedIn({ commit }, { user }) {
            userService.getUserLoggedIn(user.email, user.pass)
                .then(user => commit.setUser)
        },
        getUserById({ commit }, { userId }) {
           return userService.getUserById(userId)
                .then(user => user)
        }
    }
}
