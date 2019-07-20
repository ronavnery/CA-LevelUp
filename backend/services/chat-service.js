// const dbService = require('../services/db.service')
// const ObjectId = require('mongodb').ObjectId

module.exports = {
    pushToInbox,
    createInbox
}

const gInboxs = [{
        _id: 'djks34324jk',
        from: [{
            _id: '5d2dec114cfb9f419072650d',
            msgs: [
                {
                    txt: "hey how are you",
                    createdAt: 1565044340240
                }
            ]
        }],
}]

function createInbox(userId) {
    gInboxs.push({_id: userId})
}

function pushToInbox(data) {
    const senderInbox = gInboxs.find(inbox => inbox._id === data.senderId).from.find(user=>user._id === data.recipientId)
    console.log(senderInbox)
    // const recipientInbox = gInboxs.find(inbox => inbox._id === data.senderId)

    // })
}
