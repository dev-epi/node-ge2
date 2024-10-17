module.exports = (server)=>{
    var usersList = [
        {id : 1 , name : 'Foulen'},
        {id : 2 , name : 'Mohamed'},
        {id : 3 , name : 'Rim'}
    ]

    server.get('/users' , (req , res)=>{
        res.send(usersList)
    })
    
    server.get('/user/:x' , (req,res)=>{
        let id = req.params.x
        let user = usersList.find((u)=>u.id == id)
        if(user){
            res.send(user)
        }else{
            res.status(420).send('user not found')
        }
    
    })
    
    server.post('/create-user' , (req,res)=>{
        usersList.push(req.body)
        res.send({message : 'User added successfully'})
    })
    
    server.put('/update-user/:id' , (req,res)=>{
        let id = req.params.id
        let userIndex = usersList.findIndex(u=>u.id == id)
        if(userIndex != -1){
            usersList[userIndex].name = req.body.name
            res.send({message : 'USer updated successfully'})
        }else{
            res.status(420).send('user not found')
        }
    })
    server.delete('remove-user/:id' , (req , res)=>{
        let id = req.params.id
        let userIndex = usersList.findIndex(u=>u.id == id)
        if(userIndex != -1){
            usersList.splice(userIndex , 1)
            res.send({message : 'USer deleted successfully'})
        }else{
            res.status(420).send('user not found')
        }
    })
}




