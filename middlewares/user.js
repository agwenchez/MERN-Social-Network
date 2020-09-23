const express_JWT =  require('express-jwt');
const User = require("../models/Users");
const _ = require("lodash")

exports.userById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user) return res.status(400).json({error:"User not Found"})

        req.profile = user // adds profile object in req with user info
        next();
    })
}

exports.requireSignin = express_JWT({
    // if token is valid, its appended to the user id in auth key to the req object
    secret: process.env.JWTsecret,
    userProperty:"auth"

})
  

exports.hasAuthorization = (req,res,next) =>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id

    if(!authorized) return res.status(403).json({error:"You are not authorized to perform this request"});
    next();
}

exports.getUser = (req,res)=>{
    req.profile.password_hash = undefined;
    req.profile.salt = undefined;
    res.json(req.profile);
}

exports.updateUser = (req,res,next) =>{
    let user = req.profile
    user = _.extend(user, req.body)  //extend- mutates the source object
    user.updated = Date.now()

    user.save( err =>{
        if(err) {
            res.status(400).json({error:"You are not authorized to perform this function"})
        }
    })

    req.profile.password_hash = undefined;
    req.profile.salt = undefined;
    res.json({user});

}