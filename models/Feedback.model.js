const mongoose = require('mongoose')
const UserModel = require('./User.model')

const schema = mongoose.Schema({
    text : {type : String ,required :true},
    rating : {type : Number , default : 0},
    user_id : {type : mongoose.Schema.Types.ObjectId , ref:UserModel},
    writer_id : {type : mongoose.Schema.Types.ObjectId , ref:UserModel}
},{
    timestamps : true
})

module.exports = mongoose.model('Feedback' , schema)