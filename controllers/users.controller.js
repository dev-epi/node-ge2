var usersList = [
    {id : 1 , name : 'Foulen'},
    {id : 2 , name : 'Mohamed'},
    {id : 3 , name : 'Rim'}
]
const createUser = (req,res)=>{
    usersList.push(req.body)
    res.send({message : 'User added successfully'})
}

const getAllUsers = (req , res)=>{
    res.send(usersList)
}

const getUserById =  (req,res)=>{
    let id = req.params.x
    let user = usersList.find((u)=>u.id == id)
    if(user){
        res.send(user)
    }else{
        res.status(420).send('user not found')
    }

}

const updateUser = (req,res)=>{
    let id = req.params.id
    let userIndex = usersList.findIndex(u=>u.id == id)
    if(userIndex != -1){
        usersList[userIndex].name = req.body.name
        res.send({message : 'USer updated successfully'})
    }else{
        res.status(420).send('user not found')
    }
}

const removeUser = (req , res)=>{
    let id = req.params.id
    let userIndex = usersList.findIndex(u=>u.id == id)
    if(userIndex != -1){
        usersList.splice(userIndex , 1)
        res.send({message : 'USer deleted successfully'})
    }else{
        res.status(420).send('user not found')
    }
}

module.exports = {createUser , getAllUsers , getUserById , updateUser , removeUser}