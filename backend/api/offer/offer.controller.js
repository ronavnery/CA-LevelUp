const offerService = require('./offer.service')

async function getOffer(req, res) {
    const offer = await offerService.getById(req.params.id)
    res.send(offer)
}
  
const getOffers = async (req, res) => {
    const offers = await offerService.query()
    res.send(offers)
}

async function deleteOffer(req, res) {
    await offerService.remove(req.params.id)
    res.send({})
}

async function updateOffer(req, res) {
    const offer = await offerService.update(req.body)
    res.send({offer})
}

async function addOffer(req, res) {
    console.log(req.body)
    const offer = await offerService.add(req.body)
    res.send({offer})
}

module.exports = {
    getOffer,
    getOffers,
    deleteOffer,
    addOffer,
    updateOffer
}