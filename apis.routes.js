const userController = require("./controllers/users.controller")

module.exports = (server)=>{
 
    server.get('/users' , userController.getAllUsers)
    server.get('/user/:x' ,userController.getUserById)
    server.post('/create-user' , userController.createUser)
    server.put('/update-user/:id' , userController.updateUser)
    server.delete('/remove-user/:id' , userController.removeUser)
}




