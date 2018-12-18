
import chatService from '../services/chatService.js';
import userService from '../services/userService.js';
import { socketEmitter } from '../services/socketEmitService'

export default {
    state: {
        userChats: [],
        currChat: {},
        newMsgPerChat: {},
        newMsg: 0
    },
    getters: {
        getChat: state => state.currChat,
        getUserChats: state => state.userChats,
        getUserChatsNewMsg: state => state.newMsg,
        newMsgPerChat: state => state.newMsgPerChat
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
        },
        setNewMsg(state, { number }) {
            state.newMsg = number;
        },
        setNewMsgPerChat(state, { newMsgPerChat }) {
            state.newMsgPerChat = newMsgPerChat;
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
        getChatsById({ commit, dispatch }, { userId }) {
            return chatService.getChatsById(userId)
                .then(users => {
                    commit({ type: 'setUserChats', users })
                    dispatch({ type: 'getNewMsgPerChat' })
                })
        },
        getNewMsgPerChat({ commit, dispatch, getters }) {
            getters.getUserChats.forEach(user => {
                dispatch({
                    type: "getChatByIds",
                    userId1: getters.loggedInUser._id,
                    userId2: user._id
                })
                    .then(chat => {
                        return chat.messages.filter(msg => {
                            return msg.from !== getters.loggedInUser._id && msg.isRead === false;
                        });
                    })
                    .then(newMsgCountArray => {
                        const newMsgPerChat = {
                            ...getters.newMsgPerChat,
                            [user._id]: newMsgCountArray.length
                        }
                        commit({ type: 'setNewMsgPerChat', newMsgPerChat })
                    });
            }
            );
        },
        createChatByIds({ commit }, { userId1, userId2 }) {
            return chatService.createChatByIds(userId1, userId2)
                .then(chat => {
                    commit({ type: 'setChat', chat })
                    return chat
                })
        },
        cleanCurrentChat({ commit }){
            commit({ type: 'setChat', chat: {} })
        },
        SOCKET_getMsg({ commit, getters }, { message, chatId }) {
            console.log('getmasg');
            
            if (chatId === getters.getChat._id) commit({ type: 'updateChat', message })
            if (message.from === getters.loggedInUser._id) return
            const newMsgPerChat = {
                ...getters.newMsgPerChat,
                [message.from]: getters.newMsgPerChat[message.from] + 1
            }
            commit({ type: 'setNewMsgPerChat', newMsgPerChat })
        },
        SOCKET_setNewMsg({ commit }, { number }) {
            commit({ type: 'setNewMsg', number })
        },
        SOCKET_setNewMsgPerChat({ commit, getters }, { userId }) {
            const newMsgPerChat = {
                ...getters.newMsgPerChat,
                [userId]: 0
            }
            commit({ type: 'setNewMsgPerChat', newMsgPerChat })
        },
        SOCKET_newChat({ dispatch, getters }) {
            const userId = getters.loggedInUser._id
            dispatch({ type: 'getChatsById', userId })
        }
    }
}

