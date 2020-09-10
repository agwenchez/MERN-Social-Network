const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv1 = require('uuid/v1')
const crypto = require('crypto');
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password_hash:{
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


// virtual fields
userSchema.virtual(password)
.set( password=>{

// create a temp field _password
this._password = password

// generate timestamp
this.salt = uuidv1();

// encrypt password
this.password_hash = this.encryptPassword(password)

})
.get(()=> this._password);


userSchema.methods = {
    encryptPassword: (password)=>{
        if(!password) return ""
        try{
         
            return crypto.createHmac('sha256', this.salt)
                               .update(password)
                               .digest('hex');
           
        }catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model('users', userSchema);