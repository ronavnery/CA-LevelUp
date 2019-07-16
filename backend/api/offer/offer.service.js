
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {

    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }


    const collection = await dbService.getCollection('offer')
    try {
        const offers = await collection.find(criteria).toArray();
        // console.log(offers)
        return offers
    } catch (err) {
        console.log('ERROR: cannot find offers')
        throw err;
    }
}

async function getById(offerId) {
    const collection = await dbService.getCollection('offer')
    try {
        const offer = await collection.findOne({ "_id": ObjectId(offerId) })
        return offer
    } catch (err) {
        console.log(`ERROR: while finding offer ${offerId}`)
        throw err;
    }
}

async function getByEmail(email) {
    const collection = await dbService.getCollection('offer')
    try {
        const offer = await collection.findOne({ email })
        return offer
    } catch (err) {
        console.log(`ERROR: while finding offer ${email}`)
        throw err;
    }
}

async function remove(offerId) {
    const collection = await dbService.getCollection('offer')
    try {
        await collection.deleteOne({ "_id": ObjectId(offerId) })
    } catch (err) {
        console.log(`ERROR: cannot remove offer ${offerId}`)
        throw err;
    }
}

async function update(offer) {
    const collection = await dbService.getCollection('offer')
    const offerId = offer._id
    delete offer._id
    try {
        await collection.replaceOne({ "_id": ObjectId(offerId) }, { $set: offer })
        return offer
    } catch (err) {
        console.log(`ERROR: cannot update offer ${offer._id}`)
        throw err;
    }
}

async function add(offer, creator) {
    const collection = await dbService.getCollection('offer')
    offer.createdAt = Date.now()
    offer.createdBy = creator
    try {
        await collection.insertOne(offer);
        return offer;
    } catch (err) {
        console.log(`ERROR: cannot insert offer`)
        throw err;
    }
}



