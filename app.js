const express = require("express")
const http = require("http")
const { url } = require("inspector")
const socketio =require("socket.io")
const { PassThrough } = require("stream")
require("dotenv").config()

const formatMessage = require("./utils/message")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const chatBot = "Chat Bot"

app.use(express.static("public"))

//runs when client connect
io.on("connection",socket=>{
    console.log("Connection stablished")

    socket.on("joinRoom",({username,room})=>{

        console.log(username,room);
        
        //welcome current user
        socket.emit("message",formatMessage(chatBot,`welcome to chat`))
    
        //broadcast when user client connect
        socket.broadcast.emit("message",formatMessage(chatBot,`${username} has joined the chat`))
        
        //get message by user
        socket.on("chat-message",(msg)=>{
            console.log(msg);
            io.emit("message",formatMessage(username,msg))
        })
        
        //user disconnect
        socket.on("disconnect",()=>{
            io.emit("message",formatMessage(chatBot,`${username} has left the chat`))
        })
    })
        
})

PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})