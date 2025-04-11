const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const SkillModel = require('./Skill.model')
const ExperienceModel = require('./Experience.model')

const schema = mongoose.Schema({
    firstName : String,
    lastName : {type : String},
    email : {type : String , required : true , unique : true},
    salary : {type : Number , default : 0},
    image : {
        name : String,
        path : String
    },
   
    password : String,
    skills: [{type : mongoose.Schema.Types.ObjectId , ref : SkillModel}],
                                  
    supervisorId : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    resetKey : String,
    resetTimeout : Date
})

/* schema.pre('save' , async function(){
    console.log('before saving' , this)
    let key = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, key)
}) */ 
schema.post('find' , function(){
    
})
schema.post('deleteOne', async function(){
    console.log('from model' , this.getFilter()._id)
    let id = this.getFilter()._id
    ExperienceModel.deleteMany({user_id : id})
    
})



module.exports = mongoose.model('User' , schema)