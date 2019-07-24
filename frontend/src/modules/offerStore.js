import offerService from '../services/offer.service.js'
import apiService from '../services/api.service.js'

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

        setCurrOffer(state, { offer }) {
            state.currOffer = offer
        }
    },

    actions: {
        async loadOffers(context, { filter = '', noCommit = false}) {
            try {
                const offers = await offerService.query(filter)
                if (noCommit) return offers;
                context.commit({ type: 'setOffers', offers })
                return offers
            }
            catch (err) {
                console.log(err)
            }
        },
        async loadOffersNoCommit(context, { filter = ''}) {
            try {
                const offers = await offerService.query(filter)
                return offers
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

        async addOffer(context, { newOffer }) {
            try {
                await offerService.add(newOffer)
                context.commit({ type: 'addOffer', newOffer })
            }
            catch (err) {
                console.log(err)
            }
        },

        async updateOffer(context, { newOffer }) {
            try {
                await offerService.update(newOffer)
                context.commit({ type: 'updateOffer', newOffer })
            }
            catch (err) {
                console.log(err)
            }
        },

        async getOfferById(context, { offerId }) {
            try {
                const offer = await offerService.getById(offerId)
                context.commit({ type: 'setCurrOffer', offer })
                return offer
            } catch (err) {
                console.log(err)
            }
        },

        async searchRelatedPhotos(context, { searchTerm }) {
            try {
                const imgUrls = await apiService.getRelatedPhotos(searchTerm)
                return imgUrls
            } catch (err) {
                console.log(err)
            }
        },

        async updateOfferWithNewReview({commit}, {review, offer}) {
            try {
                const editedOffer = offerService.addReviewToOffer(offer, review)
                const updatedOffer = await offerService.update(editedOffer)
                commit({type: 'updateOffer', newOffer: updatedOffer})
                return Promise.resolve()
            } catch(err) {
                throw err
            }
        }
    }
}