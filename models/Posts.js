const mongoose = require('mongoose')
const {ObjectId} =mongoose.Schema;


const postsSchema = new mongoose.Schema({
    title :{
        required:true,
        type:String
    },
    body:{
        required:true,
        type:String
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    postedBy:{
        type: ObjectId,
        ref:"Users"
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated: Date

})


module.exports = mongoose.model("Posts", postsSchema);