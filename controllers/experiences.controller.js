const ExperienceModel = require("../models/Experience.model")


const createExperience = (req, res) => {
    let exp = new ExperienceModel(req.body)

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

const removeExperience = (req, res) => {
    let id = req.params.id
    ExperienceModel.deleteOne({_id : id})
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(420).send(err)
    })
}

module.exports = { createExperience , getAllExperiences , getExperienceById , updateExperience , removeExperience }