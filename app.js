const express = require("express")
const http = require("http")
const socketio =require("socket.io")
require("dotenv").config()

const app = express()
const server = http.createServer(app)


PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})