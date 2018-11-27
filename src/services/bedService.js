'use strict'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/bed'

function query(filter = null) {
    const searchParams = new URLSearchParams();
    const sortParams = new URLSearchParams();
    const searchAmenetiesParams = new URLSearchParams();
    if (filter) {
        searchParams.append('byCountry', filter.byCountry)
        searchParams.append('byCity', filter.byCity)
        sortParams.append('type', filter.sortBy.type)
        sortParams.append('order', filter.sortBy.order)
        searchAmenetiesParams.append('accessibility', filter.filterByAmeneties.accessibility)
        searchAmenetiesParams.append('wifi', filter.filterByAmeneties.wifi)
        searchAmenetiesParams.append('airConditioner', filter.filterByAmeneties.airConditioner)
        searchAmenetiesParams.append('shampoo', filter.filterByAmeneties.shampoo)
        searchAmenetiesParams.append('parking', filter.filterByAmeneties.parking)
    }
    const routeUrl = `${BASE_URL}?${searchParams}&${sortParams}&${searchAmenetiesParams}`
    return axios.get(routeUrl)
        .then(res => res.data)
}

function removeBed(toyId) {
    return axios.delete(`${BASE_URL}/${toyId}`)
        .then(res => res.data)
}

function saveBed(bed, userId) {
    if (bed._id) return axios.put(`${BASE_URL}/${bed._id}`, bed).then(res => res.data)
    else {
        const newBed = _createBed(bed, userId)
        return axios.post(`${BASE_URL}`, newBed).then(res => res.data)
    }
}

function getBed(bedId) {
    return axios.get(`${BASE_URL}/${bedId}`)
        .then(res => res.data)
}


export default {
    query,
    saveBed,
    removeBed,
    getBed
}

function _createBed(bed, userId) {
    return {
            hostId: userId,
            languages: bed.languages,
            imgUrl: '',
            location: bed.location,
            type: bed.type,
            rating: null,
            reviews: [],
            ameneties: bed.ameneties
        }
}
