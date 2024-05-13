const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

const rooms = {}; // מילון לאחסון החדרים

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinGame', (data) => {
        console.log(data);
    })

    socket.on('game:join-room', (roomId, playerDetails) => {
        if (!roomId) {
            // יצירת חדר חדש
            const newRoomId = generateRoomNumber();
            const newRoom = {
                players: [{ id: socket.id, ...playerDetails, sign: 'X' }],
                board: Array(9).fill(null),
                currentTurn: 0
            };
            rooms[newRoomId] = newRoom;
            socket.join(newRoomId);
            console.log(`${socket.id} created and joined room ${newRoomId}`);
            socket.emit('roomNumber', newRoomId);
        } else {
            // הצטרפות לחדר קיים
            const room = rooms[roomId];
            if (room && room.players.length < 2) {
                room.players.push({ id: socket.id, ...playerDetails, sign: 'O' });
                socket.join(roomId);
                console.log(`${socket.id} joined room ${roomId}, current players:`, room.players);

                if (room.players.length === 2) {
                    console.log('Emitting game:join-success for room', roomId);
                    io.to(roomId).emit('game:join-success', room);
                }
            } else {
                console.log('Room is full, emitting roomFull');
                socket.emit('roomFull');
            }
        }
    });

    socket.on('move', ({ roomId, index }) => {
        const room = rooms[roomId];
        if (room && room.players.some(player => player.id === socket.id)) {
            const currentPlayer = room.players[room.currentTurn];
            if (socket.id === currentPlayer.id && room.board[index] === null) {
                room.board[index] = currentPlayer.sign;
                room.currentTurn = 1 - room.currentTurn;
                io.to(roomId).emit('gameUpdate', room);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove the user from any room they were in
        // and clean up the room if it becomes empty
    });
});

function generateRoomNumber() {
    return String(Math.floor(Math.random() * 100000));
}

server.listen(3000, () => console.log("Listening on port 3000"));