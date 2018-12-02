'use strict'
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? '/api/user'
 : '//localhost:3000/api/user';


function query() {
    return axios.get(`${BASE_URL}`)
        .then(res => res.data)
}

function getUserBeds(userId) {
    return axios.get(`${BASE_URL}/userBeds/${userId}`)
        .then(res => console.log(res.data))
}

// function login({ nickname }) {
//     return axios.put(`${BASE_URL}/login`, {
//         nickname
//     })
//         .then(res => res.data)
// }

function removeUser(userId) {
    return axios.delete(`${BASE_URL}/${userId}`)
        .then(res => res.data)
}

//TAKE CARE OF ADD UPDATE
function saveUser(user, userId) {
    if (user._id) return axios.put(`${BASE_URL}/${user._id}`, user).then(res => res.data)
    else {
        const newUser = _createUser(user, userId)
        return axios.post(`${BASE_URL}`, newUser).then(res => res.data)
    }
}

function getUserLoggedIn(email, pass) {
    return axios.post(`${BASE_URL}/login`, { email, pass })
        .then(res => {
            sessionStorage.loggedinUser = JSON.stringify(res.data)
            return res.data;
        })
        .catch(err => console.log(err, 'Create msg for log-in fail'))
}

function addUser(user) {
    const newUser = _createUser(user)
    return axios.post(`${BASE_URL}/signup`, { newUser })
        .then(res => {
            sessionStorage.loggedinUser = JSON.stringify(res.data)
            return res.data;
        })
        .catch(err => console.log('show user excist ERRROR ', err))
}


function getUserById(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
        .then(res => res.data)
}


export default {
    query,
    addUser,
    saveUser,
    removeUser,
    getUserById,
    getUserBeds,
    getUserLoggedIn
}

function _createUser(user) {
    return {
        fullname: user.fullname,
        email: user.email,
        password: user.pass,
        hobbies: (user.hobbies) ? user.hobbies : [],
        languages: (user.languages) ? user.languages : [],
        isHost: false,
        aboutMe: (user.aboutMe) ? user.aboutMe : '',
        guestBadge: '',
        hostBadge: '',
        age: (user.age) ? user.age : 100,
        gender: (user.gender) ? user.gender : 'female',
        imgUrl: (user.imgUrl) ? user.imgUrl : 'https://pmcdeadline2.files.wordpress.com/2013/07/amyacker__130721002642.jpg',
        hostBedsId: [],
        bedVisitedId: [],
        reviews: [],
        chatHistory: []
    }
}
