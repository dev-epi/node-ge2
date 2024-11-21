const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const { verifyToken } = require('./middlewares/verifyToken.middleware')
//2. initialisations
const server = express()
dotenv.config()
//Activer la format JSON dans le body
server.use(express.json())
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

//4.lancement du serveur
server.listen(process.env.PORT  , ()=>{
    console.log('server run on http://localhost:'+process.env.PORT)
})

