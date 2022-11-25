const express = require("express")
const http = require("http")
const socketio =require("socket.io")
const { PassThrough } = require("stream")
require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static("public"))

io.on("connection",socket=>{
    Pass
})



PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})