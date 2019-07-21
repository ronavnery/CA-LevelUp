
const socketIO = require('socket.io');
const chatService = require('./chat-service');

var io;
var activeUsersCount = 0;

let msgsDB = []

function setup(http) {

    io = socketIO(http);
    io.on('connection', (socket) => {
        socket.on('JOIN_ROOM', (userId) => {
            socket.join(userId);
        });
        socket.on('SEND_MESSAGE', (data) => {
            const { recipientId, senderId, message } = data
            // chatService.pushToInbox(data)

            io.to(recipientId).emit('MESSAGE', { senderId, message });
        });
        socket.on('level-up-req', (req) => {
            const sentAt = Date.now()
            const { bookingMaker, offerMaker, offer } = req
            io.to(offerMaker.makerId).emit('req-sent', { bookingMaker, offer,offerMaker, sentAt });
            io.to(bookingMaker.makerId).emit('booking-sent', { bookingMaker, offer,offerMaker, sentAt });
        })
        socket.on('confirmed', (confirm) => {
            const {userId, offerId, isConfirmed} = confirm
            io.to(userId).emit('req-ans', { offerId, isConfirmed });
        })


        // socket.on('SEND_MESSAGE', ({ ownerId, fromId, message, senderId }) => {
        //     io.emit(`message:${ownerId}:${fromId}`, { message, senderId });
        // });

        // socket.on('JOIN', ({ ownerId, fromId }) => {
        //     io.emit(`incoming:${ownerId}`, { fromId });
        // });
        // socket.emit('HISTORY', msgsDB)
        // socket.on('chat join', (user) => {
        //     const msg = { from: 'System', txt: `${user} Joined` }
        //     room = chatService.placeInRoom(user)
        //     socket.join(room.id);

        //     console.log('Placed', user, 'in room:', room);

        //     socket.emit('chat newMsg', msg);
        // });
    });
}


module.exports = {
    setup
}