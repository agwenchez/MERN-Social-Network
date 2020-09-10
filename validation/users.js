exports.signupValidator = (req,res,next)=>{
    //name 
    req.check("name", "Kindly provide your name").notEmpty();
    req.check("name", "Name must be between 4 to 15 words").isLength({
        min:4,
        max:15
    })

    // email is not null, is valid and normailized
    req.check("email", "Kindly provide an email").notEmpty();
    req.check("email", "Email must contain 3 to 32 characters")
    .matches(/.+\@.+\../)
    .withMessage("Must be a valid email")
    .isLength({
        min:3,
        max:32
    })

    // password
    req.check("password", "Please enter a password").notEmpty();
    req.check("password")
    .isLength({min: 8})
    .withMessage( "password must contain more than 6 digits")
    .matches()



    // check for errors
    errors = req.validationErrors();

    if(errors){
        const Errors = errors.map( error => error.msg);
        return res.status(400).json({errors: Errors});
    }


// call the next middleware
    next()
}