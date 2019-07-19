// const dbService = require('../services/db.service')
// const ObjectId = require('mongodb').ObjectId


const gRooms = []

function placeInRoom(user, roomId) {
    let room = gRooms.find(room => room._id === roomId)
    if (room) {
        room.members.push(user)
        return room
    }
    return createRoom(user, roomId)
}


function createRoom(user, roomId) {
    const userRoom = {
        members: [user],
        id: roomId
    }
    gRooms.push(userRoom);
    return userRoom;
}
