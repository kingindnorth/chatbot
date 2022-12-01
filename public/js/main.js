const chatForm = document.getElementById("chat-form")
const chatMessage = document.querySelector(".chat-messages")

const socket = io()

const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

console.log(username,room);

socket.emit("joinRoom",{username,room})

socket.on("message",message=>{
    console.log(message);
    outputMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight
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
    div.innerHTML = `<p class="meta">${message.userName}<span>${message.date}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector(".chat-messages").appendChild(div)
}