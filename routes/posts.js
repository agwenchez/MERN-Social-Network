import  express from 'express';
const router = express.Router();
const posts = require('../models/Posts')

router.get('/',(req,res)=>{
    res.status(500).send('This route works');
})

// create new post
router.post('/post',(req, res)=>{
     data = req.body

})

module.exports = router;