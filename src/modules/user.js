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
        // logout(state) {
        //     state.user = null
        //     sessionStorage.clear()
        // },
        //NOT IN USE CURRENTLY- WAITING FOR INTEGRATE
        userBeds(state, { userBeds }) {
            console.log('BBBB', userBeds);
        }
    },
    actions: {
        checkLogin({ commit }, { user }) {
            return userService.getUserLoggedIn(user.email, user.pass)
                .then(loggeduser => {
                    commit({ type: 'setUser', loggeduser })
                    location.reload()
                })
        },
        addUser({ commit }, { user }) {
            userService.addUser(user)
                .then(loggeduser => {
                    commit({ type: 'setUser', loggeduser })
                    location.reload()
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
            commit({ type: 'setUser', loggeduser: JSON.parse(loggeduser) })
        }
    }
}
