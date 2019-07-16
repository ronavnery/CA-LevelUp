import bookingService from '../services/booking.service.js'

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
                await bookingService.set(bookingReq)
            } catch (err) {
                console.log(err)
            }
        }
    }
}