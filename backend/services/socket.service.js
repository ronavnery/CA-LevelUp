
const socketIO = require('socket.io');
const chatService = require('./chat-service');

var io;
var activeUsersCount = 0;

let msgsDB = []

function setup(http) {

    io = socketIO(http);
    io.on('connection', (socket) => {
        // TODO: Remove notify 
        socket.on('JOIN_ROOM', (userId) => {
            socket.join(userId);
        });
        socket.on('SEND_MESSAGE', (data) => {
            const { recipientId, senderId, message } = data
            io.to(recipientId).emit('MESSAGE', { senderId, message });
        });
        socket.on('level-up-req', (booking) => {
            io.to(booking.offerMaker.makerId).emit('req-sent', booking);
            io.to(booking.offerMaker.makerId).emit('notify');
        })
        socket.on('req-updated', (booking) => {
            io.to(booking.bookingMaker.makerId).emit('booking-updated', booking);
            io.to(booking.bookingMaker.makerId).emit('notify');
        })
        socket.on('msg-sent', (data) => {
            io.to(data.to._id).emit('msg-received',data);
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