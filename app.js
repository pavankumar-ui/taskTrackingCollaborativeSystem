require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const indexRoutes = require('./src/Routes/indexRoutes');
const { PrismaClient } = require('@prisma/client');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
     cors: {
         origin: "*",
         methods: ["GET", "POST"]
     }
 });

const prisma = new PrismaClient();

//setting prisma client to app object//
app.set("prisma", prisma);
//making socket io available to all routes//
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRoutes);

//socket.io connection handling//
io.on("connection", (socket) => {
     console.log("user connected", socket.id);

     //Handle task notifications//
     // Handle user-specific notifications
    socket.on('registerUser', (userId) => {
     socket.join(`user-${userId}`);
     console.log(`User ${userId} registered for notifications`);
 });

     socket.on('disconnect', () => {
          console.log("user disconnected", socket.id);
     });
});



server.listen(PORT, () => {
     console.log("Server is running on port", PORT);
})


