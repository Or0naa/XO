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

    socket.on('game:join-room', (roomId, game) => {
        if (!roomId) {
            // יצירת חדר חדש
            const newRoomId = generateRoomNumber();
            const newRoom = {
                game: game
            }
            console.log(newRoom)
            rooms[newRoomId] = newRoom;
            socket.join(newRoomId);
            let newUser = {
                socketId: socket.id,
                sign: "X",
                name: "Player 1",
                avatar: '/woman.bmp',
                wins: "0",
            }
            newRoom.game.user = newUser
            newRoom.players ? newRoom.players.push(newUser) : newRoom.players = [newUser]
            console.log(`${newUser.name} created and joined room ${newRoomId}`);
            socket.emit('roomNumber', newRoomId);
        } else {
            // הצטרפות לחדר קיים
            const room = rooms[roomId];
            const newOpponent = {
                socketId: socket.id,
                sign: "O",
                name: "Player 2",
                avatar: '/man.bmp',
                wins: "0",
            }
            if (room && room.players.length < 2) {
                room.game.user = newOpponent
                room.players.push(newOpponent);
                socket.join(roomId);
                console.log(`${newOpponent.name} joined room ${roomId}, current players:`, room.players);
                console.log('Emitting game:join-success for room', roomId);
                const newBoard = [];
                for (let i = 0; i < game.difficulty; i++) {
                    const line = [];
                    for (let j = 0; j < game.difficulty; j++) {
                        line.push({ value: "" }); // Initialize the board with empty values
                    }
                    newBoard.push(line);
                }
                room.board = newBoard;
                console.log(room)
                io.to(roomId).emit('game:join-success', room);

            } else {
                console.log('Room is full, emitting roomFull');
                socket.emit('roomFull');
            }
        }
    });

    socket.on('move', (roomId, data) => {
        const room = rooms[roomId];
        // console.log('move', data);
        console.log(roomId)
        console.log('Emitting gameUpdate for room', roomId, data);
        io.to(roomId).emit('gameUpdate', data);

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

server.listen(3001, () => console.log("Listening on port 3000"));