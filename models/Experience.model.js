const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title : {type : String ,required :true},
    company : String,
    start_date : Date,
    end_date : Date,
    description : String,
    user_id : {type : mongoose.Schema.Types.ObjectId , ref:'User'}
})

module.exports = mongoose.model('Experience' , schema)