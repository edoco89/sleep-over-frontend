// import AuthService from '../services/authService.js';

import chatService from '../services/chatService.js';

export default {
    state: {
        chat:
            {
                messages: [
                    { 
                        from: '',
                        to: '',
                        txt: '', 
                        timestamp: Date.now() 
                    }
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
                    console.log(chat);
                    
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

