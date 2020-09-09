const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')
const {createPostsValidator}= require('../validation/posts');

router.get('/',(req,res)=>{
    res.status(500).send('This route works');
})

// create new post
router.post('/new',createPostsValidator, (req, res)=>{
     data = req.body

    const newPost = new Post(data);
    newPost.save()
        .then( result =>{
            res.status(201).json(result);
        })
        .catch(err => console.log(err));

})

module.exports = router;