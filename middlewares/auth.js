const express_JWT =  require('express-jwt');



exports.requireSignin = express_JWT({

    // if token is valid, its appended to the user id in auth key to the req object

    secret: process.env.JWTsecret,
    userProperty:"auth"

})
  
