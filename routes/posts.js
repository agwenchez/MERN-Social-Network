const express = require('express');
const router = express.Router();

const {createPostValidator}= require('../validation/posts');
const {createPost} = require('../controllers/posts');

router.get('/',(req,res)=>{
    res.status(500).send('This route works');
})

// create new post
router.post('/new', createPostValidator ,createPost)

module.exports = router;