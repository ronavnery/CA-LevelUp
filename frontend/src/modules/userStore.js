import userService from '../services/user.service.js'

export default {
    state: {
        connectedUser: JSON.parse(sessionStorage.getItem('loggedInUser')) || null,
        currProfile: null,
        // users: []
    },

    getters: {
        connectedUser(state) {
            return state.connectedUser
        },
        currProfile(state) {
            return state.currProfile
        },
        users(state) {
            return state.users
        }
    },

    mutations: {


        setCurrUser(state, { loggedInUser }) {
            state.currUser = loggedInUser
        },
        setCurrProfile(state, { user }) {
            state.currProfile = user
        },
        setUsers(state, { users }) {
            state.users = users
        },
        setConnectedUser(state, { user }) {
            state.connectedUser = user;
        },
    },

    actions: {

        async loadUsers(context, filterBy) {
            try {
                const users = await userService.getUsers(filterBy)
                context.commit({ type: 'setUsers', users })
            } catch (err) {
                throw err
            }
        },
        async doLogin({ commit }, { credentials }) {
            try {
                const user = await userService.login(credentials)
                commit({ type: 'setConnectedUser', user })
                return user;
            } catch (err) {
                throw err
            }
        },
        async addUser({ commit }, { newUser }) {
            try {
                const addedUser = await userService.add(newUser)
                commit({ type: 'setConnectedUser', user: addedUser })
                return addedUser
            }
            catch (err) {
                throw err 
            }
        },
        async getProfile({ commit }, { nickName }) {
            try {
                const user = await userService.getProfileByNickname(nickName)
                commit({ type: 'setCurrProfile', user })
                return user
            } catch (err) {
                throw err
            }
        },
        async updateUser({ commit }, { userToUpdate }) {
            try {
                const updatedUser = await userService.update(userToUpdate)
                commit({ type: 'setConnectedUser', user: updatedUser })
                return updatedUser;
            } catch (err) {
                throw err
            }
        },
        async doLogout({ commit }) {
            try {
                const res = await userService.logout()
                commit({ type: 'setConnectedUser', user: null })
                return res;
            } catch (err) {
                throw err
            }
        },

        async checkIfLoggedInUser({ commit }) {
            try {
                const user = await userService.checkIfLoggedIn()
                commit({ type: 'setConnectedUser', user })
                return user
            } catch (err) {
                throw err
            }
        },

        logUserCategoryChoice({ commit }, { category, user }) {
            try {
                const res = userService.logUserCategoryChoice(category, user)
            }
            catch (err) {
                console.log(err)
            }
        },
        getUserPopularCategory({ commit }, { user }) {
            try {
                const res = userService.getUserPopularCategory(user)
                return res
            }
            catch (err) {
                console.log('Could not get user popular categories,', err)
            }
        }
    }
}