const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt: String,
    created:{
        type:Date,
        default:Date.now
    },
    updated: Date

})




module.exports = mongoose.model('users', userSchema);