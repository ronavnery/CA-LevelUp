import bookingService from '../services/booking.service.js'

export default {
    state: {
        offers: [],
        inboxSent: [],
        inboxRecieved: [],
        currOffer: {},
        unreadMsgs: 0,
        isBooking: false
    },

    getters: {
        getIsBooking(state) {
            return state.isBooking
        },
        unreadMsgs(state) {
            return state.unreadMsgs
        },
        inboxRecieved(state) {
            return state.inboxRecieved
        },
        inboxSent(state) {
            return state.inboxSent
        }

    },

    mutations: {
        setIsBooked(state) {
            state.isBooking = false
        },
        addNotification(state) {
            state.unreadMsgs++
        },

        addBooking(state, { booking }) {
            (JSON.parse(sessionStorage.getItem('loggedInUser'))._id === booking.createdBy._id)
            ? state.inboxSent.unshift(booking)
            : state.inboxRecieved.unshift(booking)
        },

        updateBooking(state, { booking }) {
            let idx = 0;
            if (JSON.parse(sessionStorage.getItem('loggedInUser'))._id === booking.createdBy._id) {
                idx = state.inboxSent.findIndex(msg => msg._id === booking._id) 
                state.inboxSent.splice(idx,1,booking)
            }else {
                idx = state.inboxRecieved.findIndex(msg => msg._id === booking._id)  
                state.inboxRecieved.splice(idx,1,booking)
            }
        },
        removeNotification(state) {
            state.unreadMsgs = 0
        },
        setUserInbox(state, { inbox, connectedUserId }) {
            let tempSent = []
            let tempRecieved = []
            inbox.forEach(msg => {
                msg.createdBy._id === connectedUserId
                    ? tempSent.push(msg)
                    : tempRecieved.push(msg);
            });
            state.inboxSent = [...tempSent]
            state.inboxRecieved = [...tempRecieved]
        }
    },

    actions: {
        async getInbox(context, { connectedUserId }) {
            try {
                const inbox = await bookingService.getUserInbox(connectedUserId)
                context.commit({ type: 'setUserInbox', inbox, connectedUserId })
                return inbox
            }
            catch (err) {
                console.log(err)
            }
        },
        async sendBookingReq(context, { bookingReq }) {
            try {
                const {booking} = await bookingService.add(bookingReq)
                context.commit({ type: 'addBooking',booking })
                return booking
                // else throw new Error('Request failed to send')
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        async sendConfirm(context, { booking }) {
            try {
                const newBookingReq = await bookingService.update(booking)
                // context.commit({type: ''})
                return newBookingReq
            } catch (err) {
                throw err
            }
        }
    }
}

//         async getUserInbox(context, { inboxId }) {
//             try {
//                 const inbox = await bookingService.getUserInbox(inboxId)
//                 console.log(inbox)
//             } catch (err) {
//                 console.log(err)
//             }
//         },
//     }
// }