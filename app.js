const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require('http')
const { verifyToken } = require('./middlewares/verifyToken.middleware')
// const { verifyToken } = require('./middlewares/verifyToken.middleware')
//2. initialisations
const server = express()
dotenv.config()
//Activer la format JSON dans le body
https://github.com/dev-epi/node-ge2
server.use(express.json())
server.use(cors())


const httpServer = http.Server(server)

// server.use(verifyToken)
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.log(err)
})
//3.traitements

server.get('/' , (req , res)=>{
    res.send('Hello')
})


require('./apis.routes')(server)
require('./routes/auth.routes')(server)

require('./socketio')(httpServer)
//4.lancement du serveur
httpServer.listen(process.env.PORT  , ()=>{
    console.log('server run on http://localhost:'+process.env.PORT)
})

