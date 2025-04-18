const socketIO = require('socket.io')
const jwt = require('jsonwebtoken')
module.exports = (httpServer)=>{

    var io = socketIO(httpServer , {
        cors : {
            origin : 'http://localhost:5173',
            methods : ['*']
        }
    })

    io.on('connection' , (socket)=>{
        console.log('socket connected' , socket.id)

        socket.on('setup' , (token)=>{
            let decoded = jwt.verify(token, process.env.SECRETKEY || '123');
            console.log('user : ' , decoded._id)
        })

        socket.on('disconnect' , ()=>{
            console.log (socket.id , 'disconnected')
        })
    })

}