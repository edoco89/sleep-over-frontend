'use strict'
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? '/api/chat'
 : '//localhost:3000/api/chat';

function getByIds(chatId1, chatId2) {
    return axios.get(`${BASE_URL}/${chatId1}/${chatId2}`)
        .then(res => res.data)
}

function getById(chatId) {
    return axios.get(`${BASE_URL}/${chatId}`)
        .then(res => res.data)
}

function createChatByIds(chatId1, chatId2) {
    return axios.post(`${BASE_URL}/${chatId1}/${chatId2}`)
        .then(res => res.data)
}

function sendMsg(chatId, message){
   return axios.put(`${BASE_URL}/${chatId}`, message).then(res => res.data)
}


export default {
    getByIds,
    sendMsg,
    createChatByIds,
    getById
}
