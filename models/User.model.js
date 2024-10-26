const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstName : String,
    lastName : {type : String},
    email : {type : String , required : true , unique : true},
    salary : {type : Number , default : 0},
    image : {
        name : String,
        path : String
    },
    password : String
})

module.exports = mongoose.model('User' , schema)