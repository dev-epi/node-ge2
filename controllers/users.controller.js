const UserModel = require("../models/User.model")


const createUser = (req, res) => {
    console.log(req.files)
    let user = new UserModel(req.body)
    if(req.files && req.files.image){
        user.image = req.files.image
    }

    user.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.status(410).send(err.errorResponse)
    })


}
const getAllUsers = async (req, res) => {

    let result = await UserModel.find().populate('skills')
    res.send(result)
}



const getUserById = async (req, res) => {
    let id = req.params.x
    try {
        let data = await UserModel.findOne({ _id: id }).populate('skills')
        res.send(data)
    } catch (err) {
        res.status(420).send(err)
    }
}

const updateUser = async(req, res) => {
    let id = req.params.id
    try{
        console.log(req.body)
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


const getAuth = async(req,res)=>{
    try {
        let data = await UserModel.findOne({ _id: req.user._id})
        .populate('skills')
        res.send(data)
    } catch (err) {
        res.status(420).send(err)
    }
}


module.exports = { createUser, getAllUsers, getUserById, updateUser, removeUser , getAuth}