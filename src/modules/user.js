import userService from '../services/userService.js';

export default {
    state: {
        user: null
    },
    getters: {
        isUserLoggedIn: state => !!state.user,
        loggedInUser: state => state.user
    },
    mutations: {
        setUser(state, { loggeduser }) {
            state.user = loggeduser
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
                .then(user => commit.setUser)
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

        }
    }
}
