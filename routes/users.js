const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/Users');
const { userSignupValidator } = require('../validation/users')

// get all users
router.get('/all',(req,res)=>{
    User.find()
    .then( users =>{
        res.status(200).json(users)
    }).catch(err => res.status(500).json({error: err}))
})




// user signup
router.post('/signup', userSignupValidator,(req,res)=>{

    const {
        name,
        email,
        password
      
    } = req.body;

    User.findOne({
        email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email already exists"
            })
        } else {
            // create new artist
            const newUser = new User({
                name,
                email,
                password
            })
            newUser.save()
                .then(
                    user => {
                        res.status(200).json(user);
                        console.log(user);
                    })
                .catch(err => console.log(err));


        }

    }).catch(err => console.log(err));
   


})

router.post('/signin', (req,res)=>{

const {_id, email, password} =req.body;

User.findOne({email}).then( user =>{

    if(!user) return "Please sign up before you log in"

    // authenticate user, make sure password and useramematch
    if(!user.authenticate(password)){
        return express.status(401).send('Email and password dont match')
    }

    //if authenticated user, generate token


}).catch(err => console.log(err));

})

module.exports = router