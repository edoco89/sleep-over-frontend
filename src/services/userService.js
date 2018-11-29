'use strict'
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/user'


function query() {
    return axios.get(`${BASE_URL}`)
        .then(res => res.data)
}

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

function getUser(email, pass) {
    return axios.post(`${BASE_URL}/login`, { email, pass })
        .then(res => {
            sessionStorage.loggedinUser = JSON.stringify(res.data)
            return res.data;
        })
}

function addUser(user) {
    return axios.post(`${BASE_URL}/signup`, user)
        .then(res => {
            sessionStorage.loggedinUser = JSON.stringify(res.data)
            return res.data;
        })
}


export default {
    query,
    addUser,
    saveUser,
    removeUser,
    getUser
}

function createUser() {
    return [
        {
            id: 1,
            fullname: 'Jake Collins',
            email: 'ggg@gmail.com',
            password: '',
            hobbies: [], //possibly create checkbox 
            aboutMe: '',
            guestBadge: '', // determine by number of visits ['First timer', 'Been Around', 'Super guest']
            hostBadge: '',  //determine by number of hostings ['Not yet', 'First steps', 'Super host']
            age: 25,
            gender: 'male',
            users: [{ address: '' }],
            visitHistory: [],
            reviewsIGotAsGuest: [
                {
                    reviewId: 1,
                    givenByUserId: 12,
                    txt: 'he was smelly',
                    rating: 3
                },
                {
                    reviewId: 1,
                    givenByUserId: 67,
                    txt: 'best guest',
                    rating: 5
                }
            ]
        }
    ]
}
