const User = require("../models/Users");

exports.userById = (req,res,id,next) =>{
    User.findById(id).exec((err,user)=>{
        if(!user || err) return res.status(400).json({error:"User not Found"})

        req.profile = user // adds profile object in req with user info
        next();
    })
}