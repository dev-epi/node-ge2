const FeedbackModel = require("../models/Feedback.model")


const create = (req, res) => {
    let item = new FeedbackModel(req.body)
    item.writer_id = req.user._id
    item.save().then(() => {
        // res.send({ success : true , body : item})
        res.send(item)
    }).catch((err) => {
        res.status(410).send(err.errorResponse)
    })
}
const getAll = async (req, res) => {
    try{

 
        // $gte >= , $gt > , $lte <= , $lt <
        // $in 
        //$regexp : '' , $options : 'i'
    let result = await FeedbackModel
    .find({user_id : req.params.user_id , rating : {$gte : 4}  })
    .populate({path : 'writer_id' , select:'firstName image'})
     let rating = 0   
        if(result.length >0){
            let somme = result.reduce((acc , obj)=> acc+obj.rating , 0)
            rating = somme/result.length
        }
    res.send({feedbacks : result , rating : rating})
    }catch(err){
        res.status(444).send(err)
    }
}



const getById = async (req, res) => {
    let id = req.params.x
    try {
        let data = await FeedbackModel.findOne({ _id: id })
        res.send(data)
    } catch (err) {
        res.status(420).send(err)
    }
}

const update = async(req, res) => {
    let id = req.params.id
    try{
       let result =await FeedbackModel.updateOne({_id : id} ,req.body)
       res.send(result)
    }catch(err){
        res.status(420).send(err)
    }

}

const remove = (req, res) => {
    let id = req.params.id
    FeedbackModel.deleteOne({_id : id})
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(420).send(err)
    })
}

module.exports = { create , getAll , getById , update , remove }