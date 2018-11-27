import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user.js'
import bedModule from './modules/bed.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // beds: [
    //   {
    //     id: 1,
    //     hostId: 1,
    //     languages: ['Russian', 'Hebrew'],
    //     location: {
    //       country: 'israel',
    //       city: 'tel-aviv',
    //       street: 'sokolov',
    //       coords: {
    //         lat: 32.0853,
    //         lng: 34.7818
    //       }
    //     },
    //     type: 'couch',
    //     rating: 4.5,
    //     reviews: [{}, {}, {}],
    //     ditstanceFromCityCenter: 12,
    //     ameneties: {
    //       accesible: true,
    //       wifi: false,
    //       acceptsPets: true,
    //       airConditioner: false,
    //       shampoo: true,
    //       parking: false,
    //     },
    //   },
    //   {
    //     id: 2,
    //     hostId: 12,
    //     languages: ['English', 'Hebrew'],
    //     location: {
    //       country: 'israel',
    //       city: 'hod-hasharon',
    //       street: 'sokolov',
    //       coords: {
    //         lat: 33.0853,
    //         lng: 35.7818
    //       }
    //     },
    //     type: 'room',
    //     rating: 4.2,
    //     reviews: [{}, {}, {}],
    //     ditstanceFromCityCenter: 15,
    //     ameneties: {
    //       accesible: true,
    //       wifi: false,
    //       acceptsPets: false,
    //       airConditioner: true,
    //       shampoo: true,
    //       parking: true,
    //     },
    //   },
    //   {
    //     id: 3,
    //     hostId: 67,
    //     languages: ['Swahili', 'Chinese'],
    //     location: {
    //       country: 'israel',
    //       city: 'berlin',
    //       street: 'yarden',
    //       coords: {
    //         lat: 32.0853,
    //         lng: 34.7818
    //       }
    //     },
    //     type: 'couch',
    //     rating: 2.5,
    //     reviews: [{}, {}, {}],
    //     ditstanceFromCityCenter: 22,
    //     ameneties: {
    //       accesible: true,
    //       wifi: false,
    //       acceptsPets: true,
    //       airConditioner: false,
    //       shampoo: true,
    //       parking: false,
    //     },
    //   }
    // ],
    // hosts: [
    //   {
    //     id: 1,
    //     name: 'jake',
    //     reviews: [
    //       {
    //         reviewId: 1,
    //         givenByUserId: 12,
    //         txt: 'it was awesome',
    //         rating: 3
    //       },
    //       {
    //         reviewId: 1,
    //         givenByUserId: 67,
    //         txt: 'it was amazing',
    //         rating: 5
    //       }
    //     ]
    //   }
    // ]
  },
  strict: true,
  modules: {
    bedModule,
    userModule
  },
  mutations: {
  },
  actions: {
  }
})
