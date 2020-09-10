exports.createUserValidator = (req,res,next)=>{
    //name 
    req.check("name", "Write a name").notEmpty();
    req.check("name", "Name must be between 4 to 150 words").isLength({
        min:4,
        max:150
    })

    // email
    req.check("email", "Email is a required field").notEmpty();
    


// call the next middleware
    next()
}