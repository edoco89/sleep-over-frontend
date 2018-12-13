'use strict'
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/user'
    : '//localhost:3000/api/user';


//TAKE CARE OF ADD-UPDATE
function saveUser(user, userId) {
    if (user._id) return axios.put(`${BASE_URL}/${user._id}`, { user })
        .then(res => { return res.data })
    else {
        const newUser = _createUser(user, userId)
        return axios.post(`${BASE_URL}`, newUser).then(res => res.data)
    }
}

//CHECK'S LOGIN
function getUserLoggedIn(email, password) {
    return axios.post(`${BASE_URL}/login`, { email, password })
        .then(res => {
            sessionStorage.loggedInUser = JSON.stringify({ email: res.data.email , password: res.data.password })
            return res.data;
        })
        .catch(err => console.log(err, 'Create msg for log-in fail'))
}

//SIGN UP - JOIN
function addUser(user) {
    const newUser = _createUser(user)
    return axios.post(`${BASE_URL}/signup`, { newUser })
        .then(res => {
            sessionStorage.loggedInUser = JSON.stringify({ email: res.data.email , password: res.data.password })
            return res.data;
        })
        .catch(err => console.log('show user exist ERROR ', err))
}

//GET BY ID-WORKS. NOT IN USE CURRENTLY
function getUserById(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
        .then(res => res.data)
}


//NEED INTEGRATE 
function getUserBeds(userId) {
    return axios.get(`${BASE_URL}/userBeds/${userId}`)
        .then(res => console.log(res.data))
}

//WORKS. NOT IN USE CURRENTLY
function query() {
    return axios.get(`${BASE_URL}`)
        .then(res => res.data)
}

//WORKS. NOT IN USE CURRENTLY
function removeUser(userId) {
    return axios.delete(`${BASE_URL}/${userId}`)
        .then(res => res.data)
}

function logout() {
    axios.delete(`${BASE_URL}/logout`)
}

export default {
    query,
    addUser,
    saveUser,
    removeUser,
    getUserById,
    getUserBeds,
    getUserLoggedIn,
    logout
}

function _createUser(user) {
    return {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        interest: (user.interest) ? user.interest : {},
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
