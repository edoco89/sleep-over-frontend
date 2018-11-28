'use strict';
import axios from 'axios'

const API_KEY = '';

function getCoordsByAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&bounds=34.172684,-118.604794|34.236144,-118.500938&key=${API_KEY}`)
        .then(res => res.data)
}

export default {
    getCoordsByAddress
}


// mapService.getCoordsByAddress('arlozorov tel aviv')
// .then( data => this.currMapCenter = data.results[0].geometry.location)
// import mapService from '@/services/mapService.js'
