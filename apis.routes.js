const userController = require("./controllers/users.controller")
const expController = require("./controllers/experiences.controller")
module.exports = (server)=>{
 
    server.get('/users' , userController.getAllUsers)
    server.get('/user/:x' ,userController.getUserById)
    server.post('/create-user' , userController.createUser)
    server.put('/update-user/:id' , userController.updateUser)
    server.delete('/remove-user/:id' , userController.removeUser)

    server.get('/experiences' , expController.getAllExperiences)
    server.get('/experience/:x' ,expController.getExperienceById)
    server.post('/create-experience' , expController.createExperience)
    server.put('/update-experience/:id' , expController.updateExperience)
    server.delete('/remove-experience/:id' , expController.removeExperience)
}




