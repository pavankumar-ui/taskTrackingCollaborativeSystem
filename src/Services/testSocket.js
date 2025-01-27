const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling'],
    cors: {
        origin: "*"
    }
});

const userId = "123";

socket.emit('registerUser', userId);

socket.on('connect', () => {
    console.log('Connected to server');
    console.log(`Registered user with ID: ${userId}`);
});

socket.on('taskAssigned', (data) => {
    console.log('Task Assignment Received:', data);
});

socket.on('taskUpdated', (data) => {
    console.log('Task Update Received:', data);
});

socket.on('connect_error', (error) => {
    console.log('Connection Error:', error);
});

// Keep the process running
process.stdin.resume();
