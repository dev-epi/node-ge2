const userController = require("./controllers/users.controller")
const expController = require("./controllers/experiences.controller")
const skillsController = require('./controllers/skills.controller')
const feedbackController = require('./controllers/feedbacks.controller')
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

    server.get('/skills' , skillsController.getAll)
    server.get('/skills/:x' ,skillsController.getById)
    server.post('/create-skills' , skillsController.create)
    server.put('/update-skills/:id' , skillsController.update)
    server.delete('/remove-skills/:id' , skillsController.remove)

    server.get('/feedbacks' , feedbackController.getAll)
    server.get('/feedbacks/:x' ,feedbackController.getById)
    server.post('/create-feedbacks' , feedbackController.create)
    server.put('/update-feedbacks/:id' , feedbackController.update)
    server.delete('/remove-feedbacks/:id' , feedbackController.remove)
}




