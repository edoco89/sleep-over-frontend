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
        getUserById({ commit }, { userId }) {
            return userService.getUserById(userId)
                .then(user => user)
        },
        //TO BE CONTINUED
        saveUser({ commit }, { user }) {
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
            commit({ type: 'setUser', loggeduser: JSON.parse(loggeduser) })
        },
        logout({ commit }) {
            commit({ type: "logout" })
        }
    }
}
