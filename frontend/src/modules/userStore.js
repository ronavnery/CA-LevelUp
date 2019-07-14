import userService from '../services/user.service.js'

export default {
    state: {
        // currProfile: {
        //     "_id": "5d29beb3cc6e115acc5822de",
        //     "name": "Justice Kerr",
        //     "userName": "JustK",
        //     "city": "Tel-Aviv, Israel",
        //     "intro": "Man.. Wikipedia me, theres just not enough room in here :D",
        //     "dateJoined": 1559629377494.0,
        //     "email": "justicekerr@retrack.com",
        //     "img": "https://connectcoworking.com/wp-content/uploads/img_1307.jpg",
        //     "password": "culpa89",
        //     "skillTags": [
        //         "Surfing",
        //         "Carpentry",
        //         "Acting"
        //     ],
        //     "offers": [{ "_id": "5d29a61ccc6e115acc5822dd" }],
        //     "wishlist": [],
        //     "leveledUpIn": []
        // }
        connectedUser: '',
        users: []
    },

    getters: {
        getConnectedUser(state) {
            return state.connectedUser
        },
        getCurrProfile(state)  {
            return state.currProfile
        },
        getUsers(state) {
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
        // async loginUser(context, { credentials }) {
        //     try {
        //         const loggedInUser = await userService.login(credentials)
        //         console.log('store', loggedInUser)
        //         context.commit({ type: 'setCurrUser', loggedInUser })
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // },
        // async getCurrProfile(context, { _id }) {
        //     try {
        //         const currProfile = await userService.getProfile(_id)
        //         console.log('store currprofile:', currProfile)
        //         context.commit({ type: 'setCurrProfile', currProfile })
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // },


        //Front-end ONly Actions
        async loadUsers(context) {
            try {
                const users = await userService.getUsers()
                context.commit({type: 'setUsers', users})
            }
            catch(err) {
                throw err
            }
        },
        async doLogin({commit}, {_id}) {
            try {
                const user = await userService.getUserById(_id)
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
            }
            catch (err) {
                throw err
            }
        },
        async getProfile({commit}, {userName}) {
            try {
                const user = await userService.getUserByUserName(userName)
                commit({type: 'setCurrProfile', user})
            }
            catch(err) {
                throw err
            }
        },
        
    }
}