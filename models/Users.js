const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
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
userSchema.virtual('password')
.set( function(password){

// create a temp field _password
this._password = password

// generate timestamp

this.salt = new Date().toUTCString()

// encrypt password
this.password_hash = this.encryptPassword(password)

})

.get(()=> this._password);


userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.password_hash;
    },
    encryptPassword: function(password){
        if(!password) return ""
        try{
         
             const hash = crypto.createHmac('sha256', this.salt)
                               .update(password)
                               .digest('hex');
            return hash;
            
           
        }catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("Users", userSchema);