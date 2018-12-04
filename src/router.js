import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
import userProfile from './views/user-profile.vue'
import searchResult from './views/search-result.vue'
import bedDetails from './views/bed-details.vue'
import chatBox from './components/chat-box.vue'
import userChat from './views/user-chat.vue'
import addBed from './components/add-bed.vue'
import bedEdit from './views/bed-edit.vue'
import userEdit from './views/user-edit.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      //
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/userProfile/:userId',
      name: 'user-profile',
      component: userProfile,
    },
    {
      path: '/userEdit/:userId',
      name: 'user-edit',
      component: userEdit
    },
    {
      path: '/searchResult',
      name: 'search-result',
      component: searchResult
    },
    {
      path: '/chat/:userId',
      name: 'user-chat',
      component: userChat
    },
    {
      path: '/bed/edit/:bedId',
      name: 'bed-edit',
      component: bedEdit
    },
    {
      path: '/bed/:bedId',
      name: 'bed-details',
      component: bedDetails
    },
    {
      path: '/addBed',
      name: 'add-bed',
      component: addBed
    },

  ]
})
