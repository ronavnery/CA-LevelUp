'use strict';
import httpService from './http.service';

export default {
    query,
    add,
    update,
    remove,
    getById,
    addReviewToOffer
}

function query(filter) {
    return httpService.get(_getUrl(), filter)
} 

function add(offer) {
    return httpService.post(_getUrl(), offer)
}

function update(offer) {
    return httpService.put(_getUrl(offer._id), offer)
}

function remove(_id) {
    return httpService.delete(_getUrl(_id))
}

function getById(_id) {
    return httpService.get(_getUrl(_id))
}

function addReviewToOffer(offer, review) {
    if (!offer.rating) {
        offer.rating = {
            avgScore: 0,
            reviews: []
        }
    }
    review.createdAt = Date.now();
    const finalReview = JSON.parse(JSON.stringify(review))
    offer.rating.reviews.push(finalReview)
    let scoreSum = offer.rating.reviews.reduce((accScore, review) => {
        console.log('lololol', review)
        accScore += review.score
        return accScore
    }, 0)
    console.log('Score Sum:', scoreSum)
    offer.rating.avgScore = parseFloat(scoreSum / offer.rating.reviews.length).toFixed(1);
    return offer
}

function _getUrl(id = '') {
    return `offer/${id}`
}





