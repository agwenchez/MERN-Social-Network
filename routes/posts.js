const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')
const {userById, requireSignin} = require('../middlewares/user')


const {createPostValidator}= require('../validation/posts');

// get all posts
router.get('/all',(req,res)=>{
    Post.find()
    .then( posts =>{
        res.status(200).json(posts)
    }).catch(err => res.status(500).json({error: err}))
})

// create new post
router.post('/new', requireSignin, createPostValidator ,(req, res)=>{
    data = req.body

   const newPost = new Post(data);
   newPost.save()
       .then( result =>{
           res.status(201).json(result);
       })
       .catch(err => console.log(err));

})

// check for user ID
router.param('userID', userById)


module.exports = router;