'use strict'
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? '/api/chat'
 : '//localhost:3000/api/chat';

function getById(chatId) {
    return axios.get(`${BASE_URL}/${chatId}`)
        .then(res => res.data)
}

function sendMsg(chat){
   return axios.put(`${BASE_URL}/${chat._id}`, chat).then(res => res.data)
}


export default {
    getById
}
