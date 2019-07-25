const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    getHistory,
    addMsg,
    checkConversationExists
}

async function getHistory(userId) {
    const collection = await dbService.getCollection('chat')
    try {
        const chat = await collection.find({ "members._id": userId }).toArray()
        return chat
    } catch (err) {
        // console.log(`ERROR: while finding chat ${userId}`)
        console.log(err)
        // throw err;
    }
}

async function addMsg(msg) {
    const collection = await dbService.getCollection('chat')
    try {
        const chat = await collection.updateOne({ 
            $and: [
                { "members._id": msg.to._id }, { "members._id": msg.from._id }] },
                { $push: { "msgs": msg }
            })
    } catch (err) {
        console.log(`ERROR: cannot update offer msg`)
        throw err;
    }
}

async function checkConversationExists(user1 ,user2) {
    const collection = await dbService.getCollection('chat')
    const chat = await collection.find({ 
        $and: [
            { "members._id": user1._id },
            { "members._id": user2._id }
        ] }).toArray()
        if (!chat.length) _createConversation(user1, user2)
}

async function _createConversation(user1, user2) {
    const collection = await dbService.getCollection('chat')

    const newChat = {
        members: [user1, user2],
        isShown: false,
        msgs: []
    }
    try {
        const chat = await collection.insertOne(newChat)
    } catch (err) {
        console.log(err)
    }
}