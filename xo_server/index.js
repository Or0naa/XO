const express = require('express'),
  app = express(),
  { createServer } = require('http'),
  { Server } = require('socket.io'),
  cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

function generateRoomNumber() {
  return Math.floor(Math.random() * 100000); // You can adjust the range as needed
}

// Game logic
const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  const roomNumber = generateRoomNumber(); 
  console.log("Room number generated:", roomNumber);
  socket.emit('roomNumber', roomNumber); 



  // Join a room
  socket.on('game:join-room', (roomId) => {
    console.log(socket.id + ' joined room ' + roomId);
    // Validate and sanitize roomId
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
        board: Array,
        currentTurn: 0 // Add currentTurn property
      };
      // console.log(`${socket.id} left room ${roomId}`);

    }

    socket.on('room:data', (game)=>{
      console.log("game", game);
    })

    const room = rooms[roomId];

    if (room.players.length < 2) {
      room.players.push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit('game:join-success', room);
    } else {
      socket.emit('roomFull');
    }
  });

  // Make a move
  socket.on('move', ({ roomId, index }) => {
    const room = rooms[roomId];
    if (room && room.players.includes(socket.id)) {
      const currentPlayer = room.players[room.currentTurn];
      if (socket.id === currentPlayer && room.board[index] === null) {
        room.board[index] = room.currentTurn;
        room.currentTurn = 1 - room.currentTurn;
        io.to(roomId).emit('roomData', room);
      }
    }
  });

  // Leave a room
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const roomId = Array.from(socket.rooms)[1]; // Get the room ID
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
