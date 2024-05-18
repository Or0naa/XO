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
            newRoom.players ? newRoom.players.push({
                socketId: socket.id,
                sign: "X",
                name: "Player 1",
                avatar: '/woman.bmp',
                wins: "0",
            }) : newRoom.players = [{
                socketId: socket.id,
                sign: "X",
                name: "Player 1",
                avatar: '/woman.bmp',
                wins: "0",
            }]
            console.log(`${socket.id} created and joined room ${newRoomId}`);
            socket.emit('roomNumber', newRoomId);
        } else {
            // הצטרפות לחדר קיים
            const room = rooms[roomId];
            if (room && room.players.length < 2) {
                room.players.push({
                    sign: "O",
                    name: "Player 2",
                    avatar: '/woman.bmp',
                    wins: 0,
                    socketId: socket.id,
                });
                socket.join(roomId);
                console.log(`${socket.id} joined room ${roomId}, current players:`, room.players);
                console.log('Emitting game:join-success for room', roomId);
                io.to(roomId).emit('game:join-success', room);

            } else {
                console.log('Room is full, emitting roomFull');
                socket.emit('roomFull');
            }
        }
    });

    socket.on('move', ({ roomId, data }) => {
        const room = rooms[roomId];
        const game = data;
        console.log('move', data);
        if (room && room.game.startGame) {
            if (game.currentPlayer == socket.id) {
                room.game.board[game.i][game.j] = game.currentTurn;
                room.game.currentTurn = game.currentTurn == 'X' ? 'O' : 'X';
                room.game.currentPlayer = room.game.currentTurn;
                io.to(roomId).emit('gameUpdate', room);
            }
            else {
                console.log('Not your turn');
            }
        }
        else {
            console.log('Game not started');
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