const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const {userById} = require('../middlewares/auth')

const { userSignupValidator } = require("../validation/users");

// get all users
router.get("/all", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// user signup
router.post("/signup", userSignupValidator, (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({
    email,
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          msg: "Email already exists",
        });
      } else {
        // create new artist
        const newUser = new User({
          name,
          email,
          password,
        });
        newUser
          .save()
          .then((user) => {
            res.status(200).json(user);
            console.log(user);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

router.post("/signin", (req, res) => {
  const { _id, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) return "Please sign up before you log in";

      // authenticate user, make sure password and username match
      if (!user.authenticate(password)) {
        return res.status(401).send("Email and password don't match");
      }

      //if authenticated user, generate token
      const token = jwt.sign({ _id: user._id }, process.env.JWTsecret);

      //persist the token as t with expiry date
      res.cookie("t", token, { expire: new Date() + 3600 });

      // return user together with token to the client
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email } });
    })
    .catch((err) => console.log(err));
});

// user log out
router.post('/logout', (req,res)=>{
    res.clearCookie("t");
    return res.json({msg: 'Log out successful'})
})

// check for user ID
router.param('userID', userById)


module.exports = router;
