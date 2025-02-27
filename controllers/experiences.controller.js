const ExperienceModel = require("../models/Experience.model")
const UserModel = require("../models/User.model")


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
        .populate({ path: 'user_id', select: "firstName lastName" })
    res.send(result)
}

const getUserExperiences = async (req, res) => {
    let result = await ExperienceModel.find({ user_id: req.params.id })
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

const updateExperience = async (req, res) => {
    let id = req.params.id
    try {
        let result = await ExperienceModel.updateOne({ _id: id }, req.body)
        res.send(result)
    } catch (err) {
        res.status(420).send(err)
    }

}

const removeExperience = async (req, res) => {
    let id = req.params.id
    let exp = await ExperienceModel.findOne({ _id: id })
    if (exp && exp.user_id == req.user._id) {
        ExperienceModel.deleteOne({ _id: id })
            .then((result) => {
                res.send(result)
            }).catch((err) => {
                res.status(420).send(err)
            })
    } else {
        res.status(420).send({ 'message': 'Not owner' })
    }

}

const search = async (req, res) => {

    let experiences = await ExperienceModel.find({
        $or: [
            {
                description: { $regex: req.params.text, $options: 'i' }
            }, {
                title: { $regex: req.params.text, $options: 'i' }
            }
        ]
    })
    let userIds = experiences.map(exp => exp.user_id)
    //$nin : not in
    //$not
    let users = await UserModel.find({ _id: { $in: userIds } })
    // let users = await UserModel.find({isAdmin : {$not : true}})
    res.send(users)
}

const getAllWithPagination = async (req, res) => {
    let nb_rows = req.params.nb_rows
    let page = req.params.page
    let skipNB = nb_rows * (page - 1)

    let experiences = await ExperienceModel.find().sort({ title: -1 }).limit(nb_rows).skip(skipNB)
    let companies = await ExperienceModel.distinct('company')
    let nb_experiences = await ExperienceModel.countDocuments()
    res.send({ experiences, companies, nb: nb_experiences })
}

const getUserWithExperiences = async (req, res) => {
    let users = await UserModel.find();
    let data = []

    
    console.log('start fetching')
    await Promise.all(users.map(async (user) => {
        let experiences = await ExperienceModel.find({ user_id: user._id })
        console.log('map')
        data.push({ user, experiences })
    })
    )
    console.log('finish')
    res.send(data)

    





  

}

module.exports = { getUserWithExperiences, getAllWithPagination, search, createExperience, getAllExperiences, getExperienceById, updateExperience, removeExperience }