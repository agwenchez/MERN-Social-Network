const express_JWT =  require('express-jwt');
const JWTsecret = 'agwenchez';

exports.requireSignin = express_JWT({ secret: process.env.JWTsecret})
//  (req,res)=>{
//     if(!req.user) return res.sendStatus(401)
//     res.sendStatus(401)
// }
  