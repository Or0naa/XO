const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

function generateRoomNumber() {
  return String(Math.floor(Math.random() * 100000));
}

const rooms = {};
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  const roomNumber = generateRoomNumber();
  console.log("Room number generated:", roomNumber);

  const newRoom = {
    players: [socket.id],
    board: Array,
    currentTurn: 0
  };
  rooms[roomNumber] = newRoom;
  socket.join(roomNumber);
  console.log(`${socket.id} created and joined room ${roomNumber}`);

  socket.emit('roomNumber', roomNumber);

  socket.on('game:join-room', (roomId, playerDetails) => {
    console.log(socket.id + ' joined room ' + roomId);
    const room = rooms[roomId];
  
    if (room && room.players.length < 2) {
      room.players.push({ id: socket.id, ...playerDetails });
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}, current players:`, room.players);
  
      if (room.players.length === 2) {
        console.log('Emitting game:join-success for room', roomId);
        io.to(roomId).emit('game:join-success', room);
        io.to(roomId).emit('game:user-success', room);
      }
    } else {
      console.log('Room is full, emitting roomFull');
      socket.emit('roomFull');
    }
  });

  socket.on('updateDetails', ({ playerType, updatedDetails }) => {
    console.log('Received update details from client:', playerType, updatedDetails);
    users[socket.id] = { ...users[socket.id], ...updatedDetails };

    const roomId = Array.from(socket.rooms)[1];
    if (roomId) {
      const room = rooms[roomId];
      if (room) {
        io.to(roomId).emit('userDetailsUpdated', { userId: socket.id, updatedDetails });
      }
    }
  });

  socket.on('move', ({ roomId, index }) => {
    const room = rooms[roomId];
    if (room && room.players.some(player => player.id === socket.id)) {
      const currentPlayer = room.players[room.currentTurn];
      if (socket.id === currentPlayer.id && room.board[index] === null) {
        room.board[index] = room.currentTurn;
        room.currentTurn = 1 - room.currentTurn;
        io.to(roomId).emit('gameUpdate', room);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const roomId = Array.from(socket.rooms)[1];
    if (roomId) {
      const room = rooms[roomId];
      if (room) {
        room.players = room.players.filter(playerId => playerId !== socket.id);
        if (room.players.length === 0) {
          delete rooms[roomId];
        } else {
          io.to(roomId).emit('roomData', room);
        }
      }
    }
  });
});

server.listen(3000, () => console.log("listening on port 3000"));
