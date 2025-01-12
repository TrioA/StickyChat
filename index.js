const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files if needed (optional)
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Adjust the path as needed
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('msg', (data) => {
        console.log('Message received:', data);
        socket.broadcast.emit('msg', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
