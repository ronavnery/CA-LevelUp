import userService from '../services/user.service.js'

export default {
    state: {
        connectedUser: null,
        currProfile: null,
        users: []
    },

    getters: {
        connectedUser(state) {
            return state.connectedUser
        },
        currProfile(state)  {
            return state.currProfile
        },
        users(state) {
            return state.users
        }
    },

    mutations: {
   

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
        setCurrUser(state, { loggedInUser }) {
            state.currUser = loggedInUser
        },
        setCurrProfile(state, {user}) {
            state.currProfile = user
        },

        updateUserInStore(state, {updatedUser}) {
            const idx = state.users.findIndex(user => user._id === updatedUser._id)
            state.users.splice(idx, 1, updatedUser)
            if (state.connectedUser._id === updatedUser._id) {
                state.connectedUser = updatedUser
            }
        },
        //Front-end Only Mutations
        setUsers(state, { users }) {
            state.users = users
        },
        setConnectedUser(state, {user}) {
            state.connectedUser = user
        },
        addUserToStore(state, {addedUser}) {
            state.users.push(addedUser)
        }
    },

    actions: {

        async loadUsers(context, filterBy) {
            try {
                const users = await userService.getUsers(filterBy)
                context.commit({type: 'setUsers', users})
            }
            catch(err) {
                throw err
            }
        },
        async doLogin({commit}, {credentials}) {
            try {
                const user = await userService.login(credentials)
                commit({type: 'setConnectedUser', user})
            }
            catch (err) {
                throw err
            }
        },
        async addUser({commit}, {newUser}) {
            try {
                const addedUser = await userService.add(newUser)
                commit({type: 'addUserToStore', addedUser})
                commit({type: 'setConnectedUser', user: addedUser})
                return addedUser
            }
            catch (err) {
                throw err
            }
        },
        async getProfile({commit}, {nickName}) {
            try {
                const user = await userService.getProfileByNickname(nickName)
                commit({type: 'setCurrProfile', user})
                return user
            }
            catch(err) {
                throw err
            }
        },
        async updateUser({commit}, {userToUpdate}) {
            try {
                const updatedUser = await userService.update(userToUpdate)
                commit({type: 'updateUserInStore', updatedUser})
            }
            catch(err) {
                throw err
            }
        }
    }
}