import bookingService from '../services/booking.service.js'
import userService from '../services/user.service.js'
import offerService from '../services/offer.service.js'

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
        removeNotification(state) {
            state.unreadMsgs = 0
        },
        setUserInbox(state, { inbox, connectedUserId }) {
            inbox.forEach(msg => {
                msg.createdBy._id === connectedUserId
                    ? state.inboxSent.push(msg)
                    : state.inboxRecieved.push(msg);
            });
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
                const newBooking = await bookingService.add(bookingReq)
                context.commit({ type: 'addBooking' })
                return newBooking
                // else throw new Error('Request failed to send')
            } catch (err) {
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