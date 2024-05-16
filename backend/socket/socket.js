const { Server } = require('socket.io')
const http = require('http')
const express = require('express')


const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["Get", "POST"]
    }
});

const getReceiverSocketId = (receiverId) => {
    return userSockedMap[receiverId];
}

const userSockedMap = {};//{userId:socketId}

io.on("connection", (socket) => {

    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId
    if (userId != "undefined") userSockedMap[userId] = socket.id

    // io.emit is used to send events to all connected clients 
    io.emit("getOnlineUsers", Object.keys(userSockedMap))

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id)
        delete userSockedMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSockedMap))
    })

})

module.exports = { app, io, server, getReceiverSocketId };