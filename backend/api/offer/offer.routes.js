const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getOffer, getOffers, deleteOffer, updateOffer, addOffer} = require('./offer.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOffers)
router.post('/', addOffer)
router.get('/:id', getOffer)
router.put('/:id', updateOffer)
router.delete('/:id', deleteOffer)

module.exports = router