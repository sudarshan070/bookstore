var Review = require("../models/review")
var Book = require('../models/books')



exports.createReview = async (req, res, next) => {
    try {
        var bookId = req.params.bookId;
        req.body.bookId = bookId
        req.body.author = res.locals.userInfo.name;
        req.body.userId = req.session.userId;
        var review = await Review.create(req.body);
        await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } }, { new: true });
        res.redirect(`/users/shopping/bookDetail/${bookId}`);
    } catch (error) {
        next(error)
    }
}

// edit REview get 
exports.geteditReview = async (req, res, next) => {
    try {
        var review = await Review.findById(req.params.reviewId)
        if (review.userId == req.session.userId) {
            res.render('editReview', { review })
        } else {
            res.redirect(`/users/shopping/bookDetail/${review.bookId}`)
        }
    } catch (error) {
        next(error)
    }
}


//   Edit Review  post
exports.posteditReview = async (req, res, next) => {
    try {
        var review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
        res.redirect(`/users/shopping/bookDetail/${review.bookId}`)
    } catch (error) {
        next(error)
    }
}

//   Delete Review
exports.deleteReview = async (req, res, next) => {
    try {
        var review = await Review.findById(req.params.reviewId);
        if (review.userId == req.session.userId) {
            var review = await Review.findByIdAndDelete(req.params.reviewId);
        }
        res.redirect(`/users/shopping/bookDetail/${review.bookId}`)
    } catch (error) {
        next(error);
    }
}