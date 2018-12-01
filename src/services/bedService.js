'use strict'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/bed'

function query(filter = null) {
    const searchParams = new URLSearchParams();
    const sortParams = new URLSearchParams();
    const searchAmenetiesParams = new URLSearchParams();
    if (filter) {
        searchParams.append('byLat', filter.byLocation.lat)
        searchParams.append('byLng', filter.byLocation.lng)
        sortParams.append('type', filter.sortBy.type)
        sortParams.append('order', filter.sortBy.order)
        searchAmenetiesParams.append('accessibility', filter.filterByAmeneties.Accessible)
        searchAmenetiesParams.append('wifi', filter.filterByAmeneties.Wifi)
        searchAmenetiesParams.append('airConditioner', filter.filterByAmeneties["Air Conditioner"])
        searchAmenetiesParams.append('shampoo', filter.filterByAmeneties.Shampoo)
        searchAmenetiesParams.append('parking', filter.filterByAmeneties.Parking)
        searchAmenetiesParams.append('children', filter.filterByAmeneties["Children Ok"])
    }
    const routeUrl = `${BASE_URL}?${searchParams}&${sortParams}&${searchAmenetiesParams}`
    return axios.get(routeUrl)
        .then(res => res.data)
}

function removeBed(bedId) {
    return axios.delete(`${BASE_URL}/${bedId}`)
        .then(res => res.data)
}
//TAKE CARE OF ADD UPDATE
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
        languages: ['English', 'Russian'],
        imgUrl: 'https://a0.muscache.com/im/pictures/8c809b10-710f-47a2-bdc8-da0b7899e1b3.jpg?aki_policy=xx_large',
        location: bed.location,
        type: bed.type,
        rating: null,
        reviews: [],
        ameneties: bed.ameneties
    }
}

