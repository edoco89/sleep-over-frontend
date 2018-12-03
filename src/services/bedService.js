'use strict'
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? '/api/bed'
 : '//localhost:3000/api/bed';

function query(filter = null) {
    const searchParams = new URLSearchParams();
    if (filter) {
        searchParams.append('byLat', filter.byLocation.lat)
        searchParams.append('byLng', filter.byLocation.lng)
        searchParams.append('type', filter.sortBy.type)
        searchParams.append('order', filter.sortBy.order)
        searchParams.append('accessibility', filter.filterByAmeneties.Accessible)
        searchParams.append('wifi', filter.filterByAmeneties.Wifi)
        searchParams.append('airConditioner', filter.filterByAmeneties["Air Conditioner"])
        searchParams.append('shampoo', filter.filterByAmeneties.Shampoo)
        searchParams.append('parking', filter.filterByAmeneties.Parking)
        searchParams.append('children', filter.filterByAmeneties["Children Ok"])
        searchParams.append('byStart', new Date(filter.selectedDate.start).getTime())
        searchParams.append('byEnd', new Date(filter.selectedDate.end).getTime())
    }
    const routeUrl = `${BASE_URL}?${searchParams}`
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

