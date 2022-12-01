const express = require("express")
const http = require("http")
const socketio =require("socket.io")
require("dotenv").config()

const formatMessage = require("./utils/message")
const {userJoin,getCurrentUser,getAllUsersInRoom} = require("./utils/users")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const chatBot = "Chat Bot"

app.use(express.static("public"))

//runs when client connect
io.on("connection",socket=>{
    console.log("Connection stablished")

    socket.on("joinRoom",({username,room})=>{

        const user = userJoin(socket.id, username,room)
        console.log(user)
        socket.join(user.room)

        console.log(username,room);
        
        //welcome current user
        socket.emit("message",formatMessage(chatBot,`welcome to chat`))
    
        //broadcast when user client connect
        socket.broadcast.to(user.room).emit("message",formatMessage(chatBot,`${user.username} has joined the chat`))
        
        //send user and room info
        io.to(user.room).emit("userRoom",{
            room:user.room,
            users:getAllUsersInRoom(user.room)
        })


        //get message by user
        socket.on("chat-message",(msg)=>{
            console.log(msg);
            io.to(user.room).emit("message",formatMessage(user.username,msg))
        })
        
        //user disconnect
        socket.on("disconnect",()=>{
            io.to(user.room).emit("message",formatMessage(chatBot,`${user.username} has left the chat`))

            //send user and room info
            io.to(user.room).emit("userRoom",{
                room:user.room,
                users:getAllUsersInRoom(user.room)
            })
        })
    })
        
})

PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})