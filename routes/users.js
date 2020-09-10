const express = require('express')
const router = express.Router();
const User = require('../models/Users');
const { userSignupValidator } = require('../validation/users')



router.post('/signin', userSignupValidator, async (req,res)=>{

    const {name, email, password}=req.body;
    const userExists = await User.findOne({email})
        if(userExists) {
            res.status(403).send("A user with that email already exists")
        }

    const newUser = await new User(
        name,
        email,
        password
    )
    await newUser.save()
    res.status(201).json({msg: "Signin successful"})
   


})

module.exports = router