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
            console.log(user);
            state.user = user
        },
        userBeds(state, { userBeds }) {
            console.log('BBBB', userBeds);
        }
    },
    actions: {
        checkLogin({ commit }, { user }) {
            userService.getUser(user.email, user.pass)
                .then(user => commit.setUser)
        },
        addUser({ commit }, { user }) {
            userService.addUser(user)
                .then(user => commit.setUser)
        },
        getUserBeds({ commit }, { userId }) {
            return userService.getUserBeds(userId)
                .then(userBeds => commit.setUserBeds)
        }
    }
}


    // this.$store.commit({
      //   type: 'setUser',
      //   user: {
      //     nickname : this.typedNickname,
      //     _id : 'asad'
      //   }
      // })