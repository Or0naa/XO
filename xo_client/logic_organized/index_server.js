const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: '*', methods: '*' } });


io.on('connection', (socket) => {
  console.log('a user connected');
  let roomNum = ''; // מזהה החדר של המשחק
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // בהתנתקות המשתמש, יש להוציא אותו מהחדר אם הוא היה בחדר
    if (roomNum) {
      socket.leave(roomNum);
      // ניתן כאן להתריע לשאר השחקנים שהמשתמש עזב את המשחק
    }
  });

  const handleNewGame = (game) => {
    console.log('Sending newGame event:', game);
    socket.join(game.roomNum); // הצטרפות לחדר המשחק
    roomNum = game.roomNum; // שמירת מזהה החדר
    socket.broadcast.to(game.roomNum).emit('newGame', game); // שליחת הודעה לחדר
  }


  const handleMove = (move) => {
    socket.broadcast.emit('move', move);
  }

  const handleUpdatePlayerInfo = (playerInfo) => {
    socket.broadcast.emit('updatePlayerInfo', playerInfo);
  }

  socket.on('newGame', handleNewGame);
  socket.on('move', handleMove);
  socket.on('updatePlayerInfo', handleUpdatePlayerInfo);

});

server.listen(3333, () => {
  console.log('listening on *:3333');
});