const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', msg); // Don't send to sender
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
