import axios from 'axios'
const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/review'
    : '//localhost:3000/review'

function addReview({ content, userId, carId }) {
    return axios.post(BASE_URL, {
        content, userId, carId
    })
    .then(res => res.data)
    
}

export default {
    addReview
}
