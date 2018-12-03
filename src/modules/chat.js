// import AuthService from '../services/authService.js';

import chatService from '../services/chatService.js';

export default {
    state: {
        chat: {}
    },
    getters: {
        getChat: ({ chat }) => chat
    },
    mutations: {
        setChat(state, { chat }) {
            state.chat = chat;
        }

    },
    actions: {
        getChatByIds({ commit }, { chatId1, chatId2 }) {
            return chatService.getByIds(chatId1, chatId2)
                .then(chat => {
                    console.log({chat});
                    commit({ type: 'setChat', chat })
                })
        },
        getChatById({ commit }, { chatId }) {
            return chatService.getById(chatId)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        },
        createChatByIds({ commit }, { chatId1, chatId2 }) {
            return chatService.createChatByIds(chatId1, chatId2)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        },
        sendMsg({ commit, state }, { message }) {
            chatService.sendMsg(state.chat._id, message)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        }
    }
}

