const express = require('express');
const app = express();
const mongoose = require('mongoose');
const posts = require('./routes/posts')
const port = process.env.PORT || 4000;
const expressValidator = require('express-validator');
require('dotenv').config();

// bodyParser Middleware
app.use(express.json({extended:false}));

app.use(expressValidator());

const db = process.env.MONGO_URI;

// DB connection
mongoose
    .connect(db,{
    useCreateIndex:true,
    // useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
    })
    .then( ()=>{
        app.listen(port, ()=>console.log(` MongoDB connected. Listening on PORT: ${port}`));
    })
    .catch(
        error =>{
            console.log(`Unable to establish a connection to the server ${error}`)
        }
    )

   
// import routes
app.use('/posts', posts);



