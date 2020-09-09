const Post = require('../models/Posts')


exports.createPost = (req, res)=>{
    data = req.body

   const newPost = new Post(data);
   newPost.save()
       .then( result =>{
           res.status(201).json(result);
       })
       .catch(err => console.log(err));

}

