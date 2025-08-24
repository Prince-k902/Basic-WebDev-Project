const Review = require("../models/review.js");
const List = require("../models/list.js");

module.exports.createReview = async(req, res)=>{
    const review = new Review(req.body.review);
    const list = await List.findById(req.params.id);
    //adding the author for review.
    review.author = req.user._id;
    
    list.reviews.push(review);
    await review.save();
    //to update listing => .save()
    await list.save();
    req.flash("success", "Review added");
    res.redirect(`/lists/${req.params.id}`);
}

module.exports.destroyReview = async(req, res)=>{
    const {id, reviewId} = req.params;

    const list = await List.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/lists/${id}`);
}