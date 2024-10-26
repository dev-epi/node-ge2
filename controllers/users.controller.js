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

const updateUser = (req, res) => {
    let id = req.params.id
    let userIndex = usersList.findIndex(u => u.id == id)
    if (userIndex != -1) {
        usersList[userIndex].name = req.body.name
        res.send({ message: 'USer updated successfully' })
    } else {
        res.status(420).send('user not found')
    }
}

const removeUser = (req, res) => {
    let id = req.params.id
    let userIndex = usersList.findIndex(u => u.id == id)
    if (userIndex != -1) {
        usersList.splice(userIndex, 1)
        res.send({ message: 'USer deleted successfully' })
    } else {
        res.status(420).send('user not found')
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, removeUser }