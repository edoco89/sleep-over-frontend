'use strict';
import axios from 'axios'

const API_KEY = '';

function getCoordsByAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}}&key=${API_KEY}`)
        .then(res => res.data)
}

export default {
    getCoordsByAddress
}