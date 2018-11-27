'use strict';
import axios from 'axios'

function getCoordsByAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}}&key=AIzaSyB6n7iEYMeOq1PxgcjFtjgKLiuUA5_Oc20`)
        .then(res => res.data)
}

export default {
    getCoordsByAddress
}