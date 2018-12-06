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
//TAKE CARE OF ADD / UPDATE
function saveBed(bed) {
    return axios.post(`${BASE_URL}`, { bed }).then(res => res.data)
}

function getBed(bedId) {
    return axios.get(`${BASE_URL}/${bedId}`)
        .then(res => res.data)
}

function addReview(reviews) {
    const bedId = reviews[reviews.length - 1].bedId
    console.log('bedservice', bedId, reviews)
    return axios.post(`${BASE_URL}/${reviews[reviews.length - 1].bedId}`, reviews, bedId)
        .then(res => res.data)
}


export default {
    query,
    saveBed,
    removeBed,
    getBed,
    addReview
}
