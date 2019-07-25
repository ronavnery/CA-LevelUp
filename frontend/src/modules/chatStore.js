

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
        startChat(state, { user1, user2 }) {
            const chat = state.chats.find(chat => chat.members[0]._id === user2._id || chat.members[1]._id === user2._id)
            if (chat) return
            state.chats.push({
                members: [user1, user2],
                isShown: true,
                msgs: []
            })
        },
        showChat(state,{ toId }) {
            const chat = state.chats.find(chat => chat.members.find(member => member._id === toId))
            if (chat) chat.isShown = !chat.isShown
        },

        addMsg(state, { msg }) {
            const chat = state.chats.find(chat => (chat.members[0]._id === msg.to._id) || (chat.members[1]._id === msg.to._id))
            chat.isShown = true
            chat.msgs.push(msg);
        },

        closeChat(state, { chat }) {
            chat.isShown = false
        },
        addChat(state, { to, from }) {
            state.chats.push({ to, from, msgs: [] })
        },
        pushHistory(state, { history }) {
            state.chats.push(...history)
        }
    },

    actions: {
        sendMsg({ commit }, { msg }) {
            commit({ type: 'addMsg', msg })
            return msg
        },
        closeChat({ commit }, { idx }) {
            commit({ type: 'closeChat', idx })
        },
    }
}

