const socketIO = require('socket.io')
const jwt = require('jsonwebtoken')
module.exports = (httpServer) => {

    let connectedUsers = []
    //1 : configuration
    const io = socketIO(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['POST', 'GET']
        }
    })

    //2 : 
    io.on('connection', (socket) => {
        console.log('Socket connected', socket.id)

        socket.on('setup', (token) => {
        
            if (token) {
                let user = jwt.verify(token, process.env.SECRETKEY || '123');
                if (user) {
                    setUser(user._id, socket.id)
                    io.emit('connectedUsers' , connectedUsers.map((x)=>x.uid))
                }

            }
        })

        socket.on('disconnect', () => {
            console.log(socket.id, 'disconnected')
            removeUser(socket.id)
            io.emit('connectedUsers' , connectedUsers.map((x)=>x.uid))
        })
    })


    const setUser = (userId, socketId) => {
        let userIndex = connectedUsers.findIndex((u) => u.uid == userId)
        if (userIndex == -1) {
            connectedUsers.push({ uid: userId, sid: socketId })
        } else {
            connectedUsers[userIndex].sid = socketId
        }

        console.log('connectedUsers' , connectedUsers)
    }

    const getUserSid = (userId) => {
        let item = connectedUsers.find(u => u.uid == userId)
        return item ? item.sid : null
    }

    const removeUser = (socketId) => {
        let userIndex = connectedUsers.findIndex((u) => u.sid == socketId)
        if (userIndex != -1) {
            connectedUsers.splice(userIndex, 1)
        }

    }

}