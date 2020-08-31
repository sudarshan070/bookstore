var User = require("../models/users")
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Category = require("../models/category")
var Book = require("../models/books");
var Cart = require('../models/cart')
var Booklist = require("../models/booklist")
var flash = require('connect-flash');


// get session 
exports.getSession = function (req, res, next) {
    if (req.session && req.session.userId) {
        console.log(req.session);
        return res.send("respond with a resource");
    } else {
        res.redirect("/users/login");
    }
}

// register user 
exports.getRegister = (req, res, next) => {
    res.render("register")
}

// post  register user
exports.postRegister = async (req, res, next) => {
    req.body.image = req.file.originalname;
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORDS
        }
    }));
    var verification = Math.floor(Math.random() * 1000000);


    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Sending Email from book store',
        text: `That was easy! ${verification}`
    };
    req.body.verification = verification
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    var user = await User.create(req.body);
    console.log(user, "here")
    var cart = await Cart.create({ userId: user.id })
    var newuser = await User.findByIdAndUpdate(user.id, { $addToSet: { cart: cart.id } });
    res.redirect('/users/login')
}


exports.verification = async (req, res, next) => {
    try {
        var user = await User.findById(req.params.email);
        if (user.verification == req.body.verification) {
            var update = await User.findByIdAndUpdate(user.id, { isVerified: true })
            res.redirect('/users/allbooks')
        } else {
            res.render('userVerify', req.flash('Verification code is wrong'))
        }
    } catch (error) {
        next(error)
    }
}


// get login user
exports.getLogin = (req, res, next) => {
    res.render("login")
}

// post  login user
exports.postLogin = (req, res, next) => {
    var { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err) return next(err)
        if (!user) {
            res.redirect("/users/login")
        }
        if (!user.verifyPassword(password) && !user.verifyPassword(password) == "") {
            return res.redirect("/users/login")
        }
        if (user.isblock) {
            return res.redirect('/users/login')
        }
        req.session.userId = user.id
        res.redirect("/users/allbooks")
    })
}

// logout user
exports.logoutUser = (req, res, next) => {
    req.session.destroy();
    res.redirect("/home")
}


// get all books
exports.getAllBook = async (req, res, next) => {
    try {
        if (!req.user.isVerified) {
            res.render('userVerify')
        }
        var cart = await Cart.findOne({ userId: req.user.id });
        var booklist = await Booklist.find({ cart: cart.id })
        var userName = req.user.name
        var categories = await Category.find({})
        var books = await Book.find({})
        res.render("userAllbook", { books, categories, userName, booklist })
    } catch (error) {
        next(error)
    }

}

// shopping route
exports.shopping = async (req, res, next) => {
    try {
        if (!req.user.isVerified) {
            res.render('userVerify')
        }
        var userName = req.user.name
        var cart = await Cart.findOne({ userId: req.user.id });
        var booklist = await Booklist.find({ cart: cart.id })
        var categories = await Category.find({});
        var allUsers = await User.find({});
        res.render("shopping", { categories, allUsers, userName, booklist });
    } catch (error) {
        next(error)
    }
}


// categoryWiseBooks
exports.userSideBooks = async (req, res, next) => {
    try {
        var cart = await Cart.findOne({ userId: req.user.id });
        var booklist = await Booklist.find({ cart: cart.id })
        var userName = req.user.name
        var categories = await Category.find({});
        var books = await Book.find({ category: req.params.name })
        res.render("userSideBooks", { books, categories, userName, booklist })
    } catch (error) {
        next(error)
    }
}

// book detail
exports.singleBookDetail = async (req, res, next) => {
    try {
        var cart = await Cart.findOne({ userId: req.user.id });
        var booklist = await Booklist.find({ cart: cart.id })
        var userName = req.user.name
        var books = await Book.findById(req.params.id).populate("reviews");
        var categories = await Category.find({});
        res.render("singleBookDetail", { books, categories, userName, booklist })
    } catch (error) {
        next(error)
    }
}
