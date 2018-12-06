// import AuthService from '../services/authService.js';

import chatService from '../services/chatService.js';
import userService from '../services/userService.js';

export default {
    state: {
        userChats: [],
        currChat: {}
    },
    getters: {
        getChat: (state) => state.currChat,
        getUserChats: (state) => state.userChats
    },
    mutations: {
        setChat(state, { chat }) {
            state.currChat = chat;
        },
        setUserChats(state, { users }) {
            state.userChats = users;
        },
        updateChat(state, { message }) {
            state.currChat.messages.push(message);
        }
    },
    actions: {
        getChatByIds({ commit }, { userId1, userId2 }) {
            return chatService.getByIds(userId1, userId2)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                    return chat
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
                .then(users => {
                    commit({ type: 'setUserChats', users })
                    return users
                })
        },
        createChatByIds({ commit }, { userId1, userId2 }) {
            return chatService.createChatByIds(userId1, userId2)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                    return chat
                })
        },
        updateChat({ commit }, { message }) {
            commit({ type: 'updateChat', message})
        }
    }
}

