// import AuthService from '../services/authService.js';

import chatService from '../services/chatService.js';

export default {
    state: {
        userChats: {},
        currChat: {}
    },
    getters: {
        getChat: (state) => state.currChat,
        getUserChats: (state) => state.userChats
    },
    mutations: {
        setChat(state, { chat }) {
            state.currChat = chat;
        }

    },
    actions: {
        getChatByIds({ commit }, { userId1, userId2 }) {
            return chatService.getByIds(userId1, userId2)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        },
        getChatById({ commit }, { chatId }) {
            return chatService.getById(chatId)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        },
        getChatsById({ commit }, { userId }) {
            return chatService.getChatsById(userId)
                .then(users => users)
        },
        createChatByIds({ commit }, { userId1, userId2 }) {
            return chatService.createChatByIds(userId1, userId2)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        },
        sendMsg({ commit, state }, { message }) {
            chatService.sendMsg(state.currChat._id, message)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        }
    }
}

