'use strict'
import axios from 'axios'
// import { promises } from 'fs';
// const BASE_URL = 'http://localhost:3000/api/toy'
// const BASE_URL = (process.env.NODE_ENV === 'production')
//     ? '/api/toy'
//     : '//localhost:3000/api/toy';


function query(filterSorter) {
    return Promise.resolve(_createBeds())
    var queryParams = new URLSearchParams()
    if (filterStatus !== 'all') {
        queryParams.append('isDone', filterStatus === 'done')
    }
    if (filterTxt) queryParams.append('q', filterTxt)
    return axios.get(`${BASE_URL}?${queryParams}`)
        .then(res => res.data)
}

function removeBed(bedId) {
    return axios.delete(`${BASE_URL}/${bedId}`)
        .then(res => res.data)
}

function saveBed(bed) {
    if (bed.id) return axios.put(`${BASE_URL}/${bed.id}`, bed).then(res => res.data)
    else {
        const newBed = _createBed(bed)
        return axios.post(`${BASE_URL}`, newBed).then(res => res.data)
    }
}

function getBed(bedId) {
    const bed = _createBeds()
    return Promise.resolve(bed[0])
    return axios.get(`${BASE_URL}/${bedId}`)
        .then(res => res.data)
}

export default {
    query,
    saveBed,
    removeBed,
    getBed
}

function _createBeds() {
    return [
        {
            id: 1,
            hostId: 1,
            languages: ['Hebrew', 'English'],
            imgUrl: '',
            location: {
                country: 'israel',
                city: 'tel-aviv',
                street: 'sokolov',
                coords: {
                    lat: 32.0853,
                    lng: 34.7818
                }
            },
            type: 'couch',
            rating: 4.5,
            reviews: [{}, {}, {}],
            ditstanceFromCityCenter: 12,
            ameneties: {
                accesible: true,
                wifi: false,
                acceptsPets: true,
                airConditioner: false,
                shampoo: true,
                parking: false,
            },
        },
        {
            id: 2,
            hostId: 12,
            languages: ['English', 'Russian'],
            imgUrl: '',
            location: {
                country: 'israel',
                city: 'hod-hasharon',
                street: 'sokolov',
                coords: {
                    lat: 33.0853,
                    lng: 35.7818
                }
            },
            type: 'room',
            rating: 4.2,
            reviews: [{}, {}, {}],
            ditstanceFromCityCenter: 15,
            ameneties: {
                accesible: true,
                wifi: false,
                acceptsPets: false,
                airConditioner: true,
                shampoo: true,
                parking: true,
            },
        },
        {
            id: 3,
            hostId: 67,
            languages: ['Swahili', 'Chinese'],
            imgUrl: '',
            location: {
                country: 'israel',
                city: 'berlin',
                street: 'yarden',
                coords: {
                    lat: 32.0853,
                    lng: 34.7818
                }
            },
            type: 'couch',
            rating: 2.5,
            reviews: [{}, {}, {}],
            ditstanceFromCityCenter: 22,
            ameneties: {
                accesible: true,
                wifi: false,
                acceptsPets: true,
                airConditioner: false,
                shampoo: true,
                parking: false,
            },
        }
    ]
}
