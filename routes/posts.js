import  express from 'express';
const router = express.Router();
const Posts = require('../models/Posts')

router.get('/',(req,res)=>{
    res.status(500).send('This route works');
})

// create new post
router.post('/post',(req, res)=>{
     data = req.body

    Posts.create(data, (err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).json(data);
        }
    })

})

module.exports = router;