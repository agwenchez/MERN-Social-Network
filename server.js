const express = require('express');
const app = express();
const mongoose = require('mongoose');
const posts = require('./routes/posts')
const port = process.env.PORT || 5000;
// const Pusher = require('pusher')

// bodyParser Middleware
app.use(express.json({extended:false}));



// DB connection
mongoose
    .connect('mongodb://localhost:27017/social_network',{
    useCreateIndex:true,
    // useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
    })
    .then( ()=>{
        app.listen(port, ()=>console.log(` Listening on PORT: ${port}`));
    })
    .catch(
        error =>{
            console.log(`Unable to establish a connection to the server ${error}`)
        }
    )

    const db = mongoose.connection;
    db.once('open', ()=>{
        console.log('connected DB for use with Pusher');
    })

    //     const msgCollection = db.collection("messagescontent");
    //     const changeStream = msgCollection.watch();
    //     // console.log(changeStream);

    //     changeStream.on("change", change =>{
    //         console.log("A change occured :", change);
    //     })
    // })
// import routes
app.use('/messages', posts);



