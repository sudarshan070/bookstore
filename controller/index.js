
var Book = require("../models/books");
var Cart = require('../models/cart')



// add to cart
exports.addToCart = async (req, res, next) => {
    try {
        var book = await Book.findById(req.params.bookId);
        var cart = await Cart.findOne({ userId: req.user.id })
        var booklist = await Booklist.findOne({ book: book.id })
        var booklist2 = await Booklist.findOne({ cart: cart.id })
        if (booklist && booklist2) {
            var booklist = await Booklist.findByIdAndUpdate(booklist.id, { $inc: { qty: req.body.qty } }, { new: true });
        } else if (!booklist2 && !booklist) {
            req.body.book = book.id;
            req.body.cart = cart.id
            var booklist = await Booklist.create(req.body);
            var cart = await Cart.findByIdAndUpdate(
                cart.id,
                { $addToSet: { bookList: booklist.id } },
                { new: true }
            )
        } else {
            req.body.book = book.id
            req.body.cart = cart.id
            var bookList = await Booklist.create(req.body)
        }
        res.redirect(`/users/shopping/bookDetail/${book.id}`)
    } catch (error) {
        next(error)
    }
}

//   my cart
exports.myCart = async (req, res, next) => {
    try {
        var cart = await Cart.findOne({ userId: req.user.id });
        var booklist = await Booklist.find({ cart: cart.id })
            .populate({
                path: "book",
                select: "title author category price image"
            })
        res.render('myCart', { booklist })
    } catch (error) {
        next(error)
    }
}