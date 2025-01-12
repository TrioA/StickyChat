const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('msg', (msg) => {
    console.log('Message: ' + msg);
    io.emit('msg', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
