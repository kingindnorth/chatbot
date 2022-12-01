const users = []

const userJoin=(id,username,room)=>{
    const user = {id,username,room}
    users.push(user)
    return user
}

const getCurrentUser=(id)=>{
    return users.find(user=>user.id===id)
}

const getAllUsersInRoom = (room) => {
    return users.filter(user=>user.room===room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    getAllUsersInRoom
}