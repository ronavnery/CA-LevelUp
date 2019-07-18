
const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;

let msgsDB = []

function setup(http) {
    
    io = socketIO(http);
    io.on('connection',  (socket) => {
        socket.on('JOIN_ROOM', (data) => {
            const { roomId, toId } = data
        // const room = roomService.placeInRoom(fromID)
            console.log(roomId)
        socket.join(roomId);
        io.emit('MESSAGE', data)
    });

    socket.emit('HISTORY', msgsDB)
    socket.on('SEND_MESSAGE', (data) => {
        // msgsDB.push(data)
        
         const { fromID, toId } = data
            console.log(data)
            io.to(toId).emit('MESSAGE', data);
        });
        socket.on('chat join', (user) => {
            const msg = { from: 'System', txt: `${user} Joined` }
            room = roomService.placeInRoom(user)
            socket.join(room.id);
    
            console.log('Placed', user, 'in room:', room);
    
            socket.emit('chat newMsg', msg);
        });
    
    });
    
}


module.exports = {
    setup
}