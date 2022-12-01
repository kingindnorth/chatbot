const express = require("express")
const http = require("http")
const socketio =require("socket.io")
const { PassThrough } = require("stream")
require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static("public"))

//runs when client connect
io.on("connection",socket=>{
    console.log("Connection stablished")
    
    //welcome current user
    socket.emit("message","welcome to chat ")

    //broadcast when user client connect
    socket.broadcast.emit("message","new user has joined the chat")

    //user disconnect
    socket.on("disconnect",()=>{
        io.emit("message","user has left the chat")
    })

    //get message by user
    socket.on("chat-message",(msg)=>{
        console.log(msg);
        io.emit("message",msg)
    })
    
})



PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})