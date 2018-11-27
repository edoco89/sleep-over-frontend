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
            name: 'jake',
            reviews: [
                {
                    reviewId: 1,
                    givenByUserId: 12,
                    txt: 'it was awesome',
                    rating: 3
                },
                {
                    reviewId: 1,
                    givenByUserId: 67,
                    txt: 'it was amazing',
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