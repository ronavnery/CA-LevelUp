
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById, 
    getByEmail,
    remove,
    update,
    add,
    updateOfferMakerImg
}

async function query(filterBy = {}) {
    console.log('filter by is', filterBy)
    let criteria = {};
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt.toLowerCase(), 'i')
        criteria = { $or: [{title: { $regex: regex}}, {description: {$regex: regex}}, {tags: {$in: [regex]}}]}
    }
    if (filterBy.groupType) {
        if (filterBy.groupType === 'group') criteria.isGroup = true;
        else criteria.isGroup = false
        // criteria.isGroup = filterBy.isGroup
    }
    // Type is used for maps - do not change! :
    if (filterBy.type) {
        criteria.type = filterBy.type
    }

    if (filterBy.category) {
        criteria.category = filterBy.category
    }


    console.log('criteria is', criteria)
    const collection = await dbService.getCollection('offer')
    try {
        console.log('filter by.limit is:',filterBy.limit)
        if (filterBy.limit) {
            const offers = await collection.find(criteria).collation({ locale: 'en', strength: 2 }).limit(+filterBy.limit).toArray();
            return offers
        }
        else {
            const offers = await collection.find(criteria).collation({ locale: 'en', strength: 2 }).toArray();
            console.log('returned offers:', offers.length)
            return offers
        }
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

async function updateOfferMakerImg(user) {
    const collection = await dbService.getCollection('offer')
    try {
        const {nickName, imgUrl} = user;
        const offers = await collection.updateMany({"createdBy.nickName": nickName}, {$set: {"createdBy.imgUrl" : imgUrl}})
        // const offers = await collection.find({"createdBy.nickName": nickName}).toArray()
        console.log('offers in backend:', offers)
        return Promise.resolve();
    } catch (err) {
        throw err
    }
}

async function add(offer) {
    const collection = await dbService.getCollection('offer')
    offer.createdAt = Date.now()
    // offer.createdBy = creator
    try {
        await collection.insertOne(offer);
        return offer;
    } catch (err) {
        console.log(`ERROR: cannot insert offer`)
        throw err;
    }
}



