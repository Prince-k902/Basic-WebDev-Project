const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const List = require("../models/list.js");
const Review = require("../models/review.js");
const {reviewSchema} = require("../schema.js");
const {isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js");
 
//MIDDLEWARE for review validation in backend(hoppscotch, postman)
const validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

//REVIEWS ROUTES
//create review
router.post("/", isLoggedIn, validateReview, wrapAsync( reviewController.createReview ));

//Delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.destroyReview);

module.exports = router;