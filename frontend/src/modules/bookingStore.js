import bookingService from '../services/booking.service.js'

export default {
    state: {
        offers: [],
        currOffer: {}
    },

    getters: {
       
    },

    mutations: {
        
    },

    actions: {
        async sendBookingReq(context, { bookingReq }) {
            try {
                await bookingService.set(bookingReq)
            } catch (err) {
                console.log(err)
            }
        }
    }
}