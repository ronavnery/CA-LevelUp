import bookingService from '../services/booking.service.js'
import userService from '../services/user.service.js'
import offerService from '../services/offer.service.js'

export default {
    state: {
        offers: [],
        currOffer: {},
        isBooking: false
    },

    getters: {
       getIsBooking(state) {
           return state.isBooking
       }
    },

    mutations: {
        setIsBooked(state) {
            state.isBooking = false
        }
    },

    actions: {
        async sendBookingReq(context, { bookingReq }) {
            try {
                console.log('got booking request:', bookingReq);
                const newBooking = await bookingService.add(bookingReq)
                const newBookingId = newBooking._id
                console.log('GOT RESPONSE! its:', newBookingId)
            } catch (err) {
                console.log(err)
            }
        }
    }
}