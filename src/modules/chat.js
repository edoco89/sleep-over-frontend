// import AuthService from '../services/authService.js';

import chatService from '../services/chatService.js';

export default {
    state: {
        chat:
            {
                id: 1,
                usersId: [],
                messeges: [
                    { txt: '', timestemp: Date.now() }
                ]
            }

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
        getChatById({ commit }, { chatId }) {
            chatService.getById(chatId)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        },
        sendMsg({ commit }, { chat }) {
            chatService.sendMsg(chat)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                })
        }
    }
}

