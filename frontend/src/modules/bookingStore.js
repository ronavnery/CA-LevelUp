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
            // bookingReq.postId =
            // console.log(this.$store.getters.getCurrOffer)
            try {
                await bookingService.set(bookingReq)
            } catch (err) {
                console.log('ive got an error', err)
            }
        }
    }
}