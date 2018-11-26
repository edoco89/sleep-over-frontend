import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import userProfile from './views/home.vue'
import searchResult from './views/search-result.vue'


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
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
    },
    {
      path: '/userProfile',
      name: 'user-profile',
      component: userProfile
    },
    {
      path: '/searchResult',
      name: 'search-result',
      component: searchResult
    }
  ]
})
