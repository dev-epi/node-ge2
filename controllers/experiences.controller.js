const ExperienceModel = require("../models/Experience.model")


const createExperience = (req, res) => {
    let exp = new ExperienceModel(req.body)
    
    exp.user_id = req.user._id

    exp.save().then(() => {
        res.send({ message: 'Experience added successfully' })
    }).catch((err) => {
        res.status(410).send(err.errorResponse)
    })
}
const getAllExperiences = async (req, res) => {
    let result = await ExperienceModel.find()
    // .populate('user_id')
    .populate({path : 'user_id' , select:"firstName lastName"})
    res.send(result)
}

const getUserExperiences = async (req, res) => {
    let result = await ExperienceModel.find({user_id : req.params.id })
    res.send(result)
}


const getExperienceById = async (req, res) => {
    let id = req.params.x
    try {
        let data = await ExperienceModel.findOne({ _id: id })
        res.send(data)
    } catch (err) {
        res.status(420).send(err)
    }
}

const updateExperience = async(req, res) => {
    let id = req.params.id
    try{
       let result =await ExperienceModel.updateOne({_id : id} ,req.body)
       res.send(result)
    }catch(err){
        res.status(420).send(err)
    }

}

const removeExperience = async(req, res) => {
    let id = req.params.id
    let exp = await ExperienceModel.findOne({_id : id})
    if(exp && exp.user_id == req.user._id){
        ExperienceModel.deleteOne({_id : id})
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
            res.status(420).send(err)
        })
    }else{
        res.status(420).send({'message' : 'Not owner'})
    }
   
}

module.exports = { createExperience , getAllExperiences , getExperienceById , updateExperience , removeExperience }