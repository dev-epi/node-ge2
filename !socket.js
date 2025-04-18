const socketIO = require('socket.io')
const jwt = require('jsonwebtoken')
module.exports = (httpServer)=>{
    var io = socketIO(httpServer, {
        cors: {
          origin: "http://localhost:5173", // 👈 أو "*" لكن الأفضل تحدد الأصل
          methods: ["GET", "POST"],
        }
      } )
    io.on('connection' , (socket)=>{
        console.log('hello' , socket.id)
    
        socket.on('setup' , (token)=>{
            console.log('token' , token)
            SetUser(token , socket.id)
            let ids = connectedUsers.map(x=>x.userId)
            io.emit('connectedUsers' ,ids )
        })
    
        socket.on('disconnect',()=>{
            console.log('disconnected')
            removeUser(socket.id)
            let ids = connectedUsers.map(x=>x.userId)
            console.log(connectedUsers)
            io.emit('connectedUsers' ,ids )
        })

        socket.on('send' , (userID)=>{
            console.log('send action from' , userID)
            let userSID = getUSer(userID)
            if(userSID){
                console.log('found user connected')
                console.log(connectedUsers)
                console.log(userSID)
                io.to(userSID).emit('notification')
            }
        })

       
    })
    
}

let connectedUsers = []

const SetUser =(token , socketID)=>{
   try{
    const decoded = jwt.verify(token, process.env.SECRETKEY || '123');
  //  console.log(decoded)
   let u = connectedUsers.findIndex(x=> x.userId == decoded._id)
   if(u != -1){
    connectedUsers[u].sid = socketID
   }else{
    connectedUsers.push({userId : decoded._id ,sid : socketID })
   }

   }catch(err){
   
   }

}

const getUSer = (userId)=>{
    let user = connectedUsers.find(x=>x.userId == userId)
    if(user){
        return user.sid
    }else{
        return null
    }
}

const removeUser = (socketID)=>{
    let userIndex = connectedUsers.findIndex(x=>x.sid == socketID)
    if(userIndex != -1){
       connectedUsers.splice(userIndex , 1)
    }
}

