'use strict'
import axios from 'axios'

function getAddress(lat, lng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB6n7iEYMeOq1PxgcjFtjgKLiuUA5_Oc20&latlng=${lat}%2C${lng}&language=en`)
        .then(res => res.data)
}

export default {
    getAddress
}