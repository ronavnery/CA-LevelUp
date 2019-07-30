
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



        // chat
        socket.on('chat-join', async userId => {
            socket.join(userId)
            const history = await chatService.getHistory(userId)
            io.to(userId).emit('got-history', history);
        })
        socket.on('start-chat', ({ user1, user2 }) => {
            chatService.checkConversationExists(user1, user2)
        })
        socket.on('msg-sent', (msg) => {
            console.log('message to id:',msg.to._id)
            chatService.addMsg(msg);
            io.to(msg.to._id).emit('msg-received', msg);
        })
        // socket.on('history', async routes => {
        //     try{
        //         const chat = await chatService.getHistory(routes)
        //         console.log(chat)
        //         io.to(routes.from._id).emit('got-history', chat)
        //     }catch(err) {
        //         console.log(err)
        //     }
        // })
    });
}


module.exports = {
    setup
}