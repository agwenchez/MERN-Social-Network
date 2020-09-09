const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')

router.get('/',(req,res)=>{
    res.status(500).send('This route works');
})

// create new post
router.post('/new',(req, res)=>{
     data = req.body

    const newPost = new Post(data);
    newPost.save()
        .then( result =>{
            res.status(201).json(result);
        })
        .catch(err => console.log(err));

})

module.exports = router;