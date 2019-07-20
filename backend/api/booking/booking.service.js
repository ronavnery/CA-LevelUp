
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    getInbox,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    console.log(filterBy)
    const criteria = {};
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt)
        criteria.title = { $regex: regex }
    }


    const collection = await dbService.getCollection('booking')
    try {
        const bookings = await collection.find(criteria).toArray();
        return bookings
    } catch (err) {
        console.log('ERROR: cannot find bookings')
        throw err;
    }
}

async function getById(bookingId) {
    const collection = await dbService.getCollection('booking')
    try {
        const booking = await collection.findOne({ "_id": ObjectId(bookingId) })
        return booking
    } catch (err) {
        console.log(`ERROR: while finding booking ${bookingId}`)
        throw err;
    }
}

async function getByEmail(email) {
    const collection = await dbService.getCollection('booking')
    try {
        const booking = await collection.findOne({ email })
        return booking
    } catch (err) {
        console.log(`ERROR: while finding booking by email ${email}`)
        throw err;
    }
}

async function remove(bookingId) {
    const collection = await dbService.getCollection('booking')
    try {
        await collection.deleteOne({ "_id": ObjectId(bookingId) })
    } catch (err) {
        console.log(`ERROR: cannot remove booking ${bookingId}`)
        throw err;
    }
}

async function update(booking) {
    const collection = await dbService.getCollection('booking')
    const bookingId = booking._id
    delete booking._id
    try {
        await collection.replaceOne({ "_id": ObjectId(bookingId) }, { $set: booking })
        return booking
    } catch (err) {
        console.log(`ERROR: cannot update booking ${booking._id}`)
        throw err;
    }
}

async function add(booking, creator) {
    // console.log('in service, got booking:', booking)
    const collection = await dbService.getCollection('booking')
    console.log('Connected to collection booking')
    booking.createdAt = Date.now()
    booking.createdBy = creator
    try {
        console.log('Trying to insert booking to db');
        await collection.insertOne(booking);
        console.log('Inserted booking to db.');
        return booking;
    } catch (err) {
        console.log(`ERROR: cannot insert booking`)
        throw err;
    }
}

async function getInbox(inboxId) {
    console.log('inbox id',inboxId[0])
    const collection = await dbService.getCollection('msgs')
    try {
        const inbox = await collection.find({ "userId": ObjectId(userId) })
        console.log('inbox', inbox)

    } catch (err) {
    }

    //     'msgs' = [
    //         {
    //             userId: 'dsada424r23dd',
    //             msgs: 
    //             [{  
    //                 roomId: '432423423eqwdq',
    //                 participants: ['id1', 'id2'],
    //                 content:
    //                     [{
    //                         createdAt: 4234234234,
    //                         txt: 'fcdscvds'
    //                     }]
    //         }]
    //     }
    // ]

    // }
    // const criteria = {};
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt)
    //     criteria.title = { $regex: regex }
    // }
}
