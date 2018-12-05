'use strict'
import axios from 'axios'
 
const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/chat'
    : '//localhost:3000/api/chat';

function getByIds(userId1, userId2) {
    return axios.get(`${BASE_URL}/${userId1}/${userId2}`)
        .then(res => res.data)
}

function getById(chatId) {
    return axios.get(`${BASE_URL}/${chatId}`)
        .then(res => res.data)
}

function getChatsById(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
        .then(res => res.data)
}

function createChatByIds(userId1, userId2) {
    return axios.post(`${BASE_URL}/${userId1}/${userId2}`)
        .then(res => res.data)
}


export default {
    getByIds,
    createChatByIds,
    getById,
    getChatsById
}
