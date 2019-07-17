
const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        var room;
        activeUsersCount++;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('history', (userId) => {
            console.log('check for history');
            const msgs = roomService.getHistorByUserId(userId)
            socket.emit('got_history', msgs)
            console.log(msgs)

            activeUsersCount--;
        });




        // socket.on('JOIN_ROOM', (data) => {
        //     const { roomId, user } = data
        //     // const room = roomService.placeInRoom(user, roomId)
        //     console.log(data)
        //     socket.join(data);

        //     socket.on('history', (inboxId) => {
        //         const msgs = roomService.getMsgsById(inboxId)

        //         io.to(inboxId).emit('MESSAGE', msgs);
        //     });
        //     // io.emit('MESSAGE', data)
        // });

        // socket.on('chat join', (user) => {
        //     room = roomService.placeInRoom(user)
        //     console.log('Placed', user, 'in room:', room);
        //     socket.join(room.id);
        // });

        // socket.on('chat msg', (msg) => {
        //     console.log('message: ' + msg);
        //     io.to(room.id).emit('chat newMsg', msg);
        // });
    });




}


module.exports = {
    setup
}