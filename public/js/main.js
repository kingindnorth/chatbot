const chatForm = document.getElementById("chat-form")

const socket = io()

socket.on("message",message=>{
    console.log(message);
    outputMessage(message)
})

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const msg = e.target.elements.msg.value
    socket.emit("chat-message",msg)
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus()
})

const outputMessage = (message) =>{
    const div = document.createElement("div")
    div.classList.add("message")
    const p = document.createElement("p")
    
}