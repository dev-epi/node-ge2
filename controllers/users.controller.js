const UserModel = require("../models/User.model")

var usersList = [
    { id: 1, name: 'Foulen' },
    { id: 2, name: 'Mohamed' },
    { id: 3, name: 'Rim' }
]
const createUser = (req, res) => {
    let user = new UserModel(req.body)


    user.save().then(() => {
        res.send({ message: 'User added successfully' })
    }).catch((err) => {
        res.status(410).send(err.errorResponse)
    })


}
const getAllUsers = async (req, res) => {
    let result = await UserModel.find()
    res.send(result)
}



const getUserById = async (req, res) => {
    let id = req.params.x
    try {
        let data = await UserModel.findOne({ _id: id })
        res.send(data)
    } catch (err) {
        res.status(420).send(err)
    }
}

const updateUser = async(req, res) => {
    let id = req.params.id
    try{
       let result =await UserModel.updateOne({_id : id} ,req.body)
       res.send(result)
    }catch(err){
        res.status(420).send(err)
    }

}

const removeUser = (req, res) => {
    let id = req.params.id
    UserModel.deleteOne({_id : id})
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(420).send(err)
    })
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, removeUser }