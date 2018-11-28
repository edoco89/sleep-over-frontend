import axios from 'axios'
// const BASE_URL = process.env.NODE_ENV !== 'development'
//     ? '/user'
//     : '//localhost:3000/user'

function query() {
    return createUser();
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function getById(id) {
    return axios.get(`${BASE_URL}/${id}`)
        .then(res => res.data)
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
            beds: [],
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

export default {
    query,
    getById
}