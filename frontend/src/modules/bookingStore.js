import bookingService from '../services/booking.service.js'
import userService from '../services/user.service.js'
import offerService from '../services/offer.service.js'

export default {
    state: {
        offers: [],
        userInbox: {},
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
        }
    },

    actions: {
        async getInbox(context, { filter }) {
            try {
                console.log('currprofile is:', this.$store.getters.currProfile)
                console.log('store got action: filter is', filter)
                const inbox = await bookingService.query()
            }
            catch (err) {
                console.log(err)
            }
        },
        async sendBookingReq(context, { bookingReq }) {
            try {
                console.log('got booking request:', bookingReq);
                const newBooking = await bookingService.add(bookingReq)
                if (newBooking) return newBooking
                // const newBookingId = newBooking.booking._id
                // if (newBookingId) return 'Request sent!'
                else throw new Error('Request failed to send')
            } catch (err) {
                console.log(err)
                return err
            }
        },
        async getUserInbox(context, { inboxId }) {
            try {
                const inbox = await bookingService.getUserInbox(inboxId)
                console.log(inbox)
            } catch (err) {
                console.log(err)
            }
        },
    }
}