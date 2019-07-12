import offerService from '../services/offer.service.js'

export default {
    state: {
        offers: [],
        currOffer: {}
    },

    getters: {
        getOffers(state) {
            return state.offers
        },
        getCurrOffer(state) {
            return state.currOffer
        }
    },

    mutations: {
        setOffers(state, { offers }) {
            state.offers = offers
        },

        removeOffer(state, { offerId }) {
            const idx = state.offers.findIndex(offer => offer._id === offerId)
            state.offers.splice(idx, 1)
        },

        addOffer(state, { offer }) {
            state.offers.unshift(offer)
        },

        updateOffer(state, { newOffer }) {
            const idx = state.offers.findIndex(offer => offer._id === newOffer._id)
            state.offers.splice(idx, 1, newOffer)
        },

        //currently server does not provide offer back 'cause there is no server
        setCurrOffer(state, { offer }) {
            state.currOffer = offer
        }
    },

    actions: {
        async loadOffers(context, { filter = '' }) {
            try {
                const offers = await offerService.query(filter)
                context.commit({ type: 'setOffers', offers })
            }
            catch (err) {
                console.log(err)
            }
        },

        async removeOffer(context, { offerId }) {
            try {
                await offerService.remove(offerId)
                context.commit({ type: 'removeOffer', offerId })
            }
            catch (err) {
                console.log(err)
            }
        },

        async addOffer(context, { offer }) {
            try {
                await offerService.add(offer)
                context.commit({ type: 'addOffer', offer })
            }
            catch (err) {
                console.log(err)
            }
        },

        async updateOffer(context, { offer }) {
            try {
                await offerService.update(offer)
                context.commit({ type: 'updateOffer', offer })
            }
            catch (err) {
                console.log(err)
            }
        },

        async getOfferById(context, { offerId }) {
            try {
                const offer = await offerService.getById(offerId)
                return context.commit({ type: 'setCurrOffer', offer })
            } catch (err) {
                console.log(err)
            }
        }
    }
}