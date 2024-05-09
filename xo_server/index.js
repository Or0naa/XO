const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require('socket.io'),
    cors = require('cors');

app.use(cors())

const server = createServer(app)
const io = new Server(server, { cors: { origin: '*', methods: '*' } })

function generateRoomNumber() {
    return Math.floor(Math.random() * 100000); // You can adjust the range as needed
}


app.get('/createRoom', (req, res) => {
    const roomNumber = generateRoomNumber();
    res.send({ roomNumber });
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('room', (roomNumber) => {
        socket.join(roomNumber)
        socket.emit('room-status', `Success join to room: ${roomNumber}, members : ${io.sockets.adapter.rooms.get(roomNumber).size}`)
    })
    console.log("connected", socket.id);

    socket.on('move', (data) => {
        socket.to(data.room).emit('move', data);
    });

    socket.on('start', (data) => {
        socket.to(data.room).emit('start', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });

})

server.listen(3000, () => console.log("listening on port 3000"))