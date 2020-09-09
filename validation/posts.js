exports.createPostValidator = (req,res,next) => {
    // title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 to 150 words").isLength({
        min:4,
        max:150
    })


    // body
    req.check("body", "Write a body").notEmpty();
    req.check("body", "Body must be between 4 to 2000 words").isLength({
        min:4,
        max:2000
    })

    // check for errors
    errors = req.validationErrors();

    if(errors){
        const Errors = errors.map( error => error.msg);
        return res.status(400).json({errors: Errors});
    }

    // proceed to next middleware
    next();


}