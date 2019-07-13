import userService from '../services/user.service.js'

export default {
    state: {
        connectedUser: '',
        currProfile: {
            "_id": "5d29beb3cc6e115acc5822de",
            "name": "Justice Kerr",
            "userName": "JustK",
            "city": "Tel-Aviv, Israel",
            "intro": "Man.. Wikipedia me, theres just not enough room in here :D",
            "dateJoined": 1559629377494.0,
            "email": "justicekerr@retrack.com",
            "img": "https://connectcoworking.com/wp-content/uploads/img_1307.jpg",
            "password": "culpa89",
            "skillTags": [
                "Surfing",
                "Carpentry",
                "Acting"
            ],
            "offers": [{ "_id": "5d29a61ccc6e115acc5822dd" }],
            "wishlist": [],
            "leveledUpIn": []
        }
    },

    getters: {
        getConnectedUser(state) {
            return state.connectedUser
        },
        getCurrProfile(state)  {
            return state.currProfile
        }
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
        async setCurrProfile(context, { credentials }) {
            try {
                const currProfile = await userService.login(credentials)
                console.log('store', loggedInUser)
                // context.commit({ type: 'loginUser', loggedInUser })
            }
            catch (err) {
                console.log(err)
            }
        },


    }
}