const express_JWT =  require('express-jwt');

exports.requireSignin = express_JWT({ secret: process.env.JWTsecret})