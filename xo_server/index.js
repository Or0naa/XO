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

app.get('/', (req, res) => {
  const roomNumber = generateRoomNumber();
  console.log("Room number generated:", roomNumber);
  res.send({ roomNumber });
});

const joinRoomEvent = 'game:join-room';

// Game logic
const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room
  socket.on(joinRoomEvent, (roomId) => {
    // Validate and sanitize roomId
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
        board: Array(9).fill(null),
        currentTurn: 0 // Add currentTurn property
        // Add other game state properties as needed
      };
    }

    const room = rooms[roomId];

    if (room.players.length < 2) {
      room.players.push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit('roomData', room);
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
