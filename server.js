const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const expressValidator = require('express-validator');

const postRoute = require('./routes/posts')
const userRoute = require('./routes/users')

// bodyParser Middleware
app.use(express.json({extended:false}));

app.use(expressValidator());

const db = 'mongodb://localhost:27017/social_network';

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
app.use('/posts', postRoute);
app.use('/users', userRoute);



