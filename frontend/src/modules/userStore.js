import userService from '../services/user.service.js'

export default {
    state: {
        connectedUser: ''
    },

    getters: {
        getConnectedUser(state) {
            return state.connectedUser
        },
    },

    mutations: {
        // setusers(state, { users }) {
        //     state.users = users
        // },

        // removeuser(state, { userId }) {
        //     const idx = state.users.findIndex(user => user._id === userId)
        //     state.users.splice(idx, 1)
        // },

        // adduser(state, { user }) {
        //     state.users.unshift(user)
        // },

        // updateuser(state, { newuser }) {
        //     const idx = state.users.findIndex(user => user._id === newuser._id)
        //     state.users.splice(idx, 1, newuser)
        // },

        // //currently server does not provide user back 'cause there is no server
        // setCurruser(state, { user }) {
        //     const userId = user
        //     const nuser = state.users.find(user => user._id === userId)
        //     return state.curruser = nuser

            // Real mutattion
            // state.curruser = user
    // }
    },

    actions: {
        async loginUser(context, { credentials }) {
            try {
                const loggedInUser = await userService.login(credentials)
                console.log('store', loggedInUser)
                // context.commit({ type: 'loginUser', loggedInUser })
            }
            catch (err) {
                console.log(err)
            }
        },

    }
}