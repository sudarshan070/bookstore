var User = require("../models/users")
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Category = require("../models/category")
var Book = require("../models/books");
var Cart=require('../models/cart')


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
    var verification = Math.floor(Math.random()*1000000);
    console.log(verification, "verification ------------ - -")

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
    var user= await User.create(req.body);
    console.log(user,"here")
    var cart= await Cart.create({userId:user.id})
    var newuser= await User.findByIdAndUpdate(user.id,{$addToSet:{cart:cart.id}});
    console.log(newuser,"user",cart,"cart" )
    res.redirect('/users/login')
}


exports.nodemailer = async (req, res) => {
    try {
        var user = await User.findById(req.params.email );
        console.log(user,"ser is here");
        if(user.verification == req.body.verification){
            var update= await User.findByIdAndUpdate(user.id,{isVerified:true})
            console.log(update,"here we ahe")
            res.redirect('/users/shopping')
        }else{
            res.render('userVerify')
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
        if (!user.verifyPassword(password)) {
            return res.redirect("/users/login")
        }
        req.session.userId = user.id
        res.redirect("/users/shopping")
    })
}

// logout user
// change here delete user wikthout distroy session
exports.logoutUser = (req, res, next) => {
    req.session.destroy()
    // req.session = null;
    console.log(req.session, "------------------")
    res.redirect("/home")
}


// shoping route
exports.shopping = async (req, res, next) => {
    try {
        console.log(req.user,"user")
        if(!req.user.isVerified){
            res.render('userVerify')
        }
        var categories = await Category.find({});
        var allUsers = await User.find({});
        res.render("shopping", { categories, allUsers });
    } catch (error) {
        next(error)
    }
}


// categoryWiseBooks
exports.userSideBooks = (req, res, next) => {
    Book.find({ category: req.params.name }, (err, books) => {
        if (err) return next(err)
        return res.render("userSideBooks", { books })
    })
}

// book detail
exports.singleBookDetail = (req, res, next) => {
    Book.findById(req.params.id, (err, books) => {
        if (err) return next(err)
        res.render("singleBookDetail", { books })
    })


}