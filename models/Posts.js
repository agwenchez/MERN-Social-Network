import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema;


const postsSchema = new Schema({
    title :{
        required:true,
        type:String
    },
    body:{
        required:true,
        type:String
    }
})


module.exports = mongoose.model(postsSchema,'posts');