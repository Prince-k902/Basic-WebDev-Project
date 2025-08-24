const List = require("./models/list.js");
const ExpressError = require("./utils/expressError.js");
const {listSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrlPath = req.originalUrl;
        // console.log(req.session);
        req.flash("error", "You must be loggedIn!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.redirectUrl = (req, res, next)=>{
    if(req.session.redirectUrlPath){
        res.locals.redirectUrlPath = req.session.redirectUrlPath;
    }
    next();
}

module.exports.isOwner = async (req, res, next)=>{
    let {id} = req.params;
    const list = await List.findById(id);
    if( ! list.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have permission");
        return res.redirect(`/lists/${id}`);
    }
    next();
}

//MIDDLEWARE for list validation in backend(hoppscotch, postman)
module.exports.validateList = (req, res, next) => {
    // joi error handler for validation 
    let {error} = listSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    // console.log(review);
    if( ! review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You can't delete this review.");
        return res.redirect(`/lists/${id}`);
    }
    next();
}