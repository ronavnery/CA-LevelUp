

export default {
    state: {
        chats: []
    },

    getters: {
        chats(state) {
            return state.chats
        },
    },

    mutations: {
        addMsg(state, { msg }) {
            const idx = state.chats.findIndex(chat => chat.to.nickName === msg.to.nickName);
            state.chats[idx].msgs.push(msg.msg);
        },
        closeChat(state, { idx }) {
            state.chats.splice(idx, 1);
        },
        addChat(state, { to, from}) {
            state.chats.push({ to, from, msgs: [] })
        }
    },

    actions: {
        startChat({ commit }, { to,from }) {
            commit({ type: 'addChat', to, from })
        },
        sendMsg({ commit }, { msg }) {
            commit({ type: 'addMsg', msg })
            return msg
        },
        closeChat({ commit }, { idx }) {
            commit({ type: 'closeChat', idx })
        },
    }
}

