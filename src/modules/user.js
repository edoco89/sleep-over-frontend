// import AuthService from '../services/authService.js';
import AuthService from '../services/userService.js';
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