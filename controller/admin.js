var User = require("../models/users")
var Category = require("../models/category")
var Book = require("../models/books")



exports.getDashboard = (req, res, next) => {
    Category.find({}).exec((err, category) => {
        if (err) return next(err)
        res.render("adminDashboard", { category });
    })
}

// get CreateCategory
exports.createCategory = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.render("categoryForm");
    }
}

// post createCategory
exports.postCreateCategory = (req, res, next) => {
    req.body.image = req.file.originalname;
    Category.create(req.body, (err, category) => {
        if (err) return next(err)
        res.redirect("/admin")
    })
}


// get all book 
exports.getAllBook = (req, res, next) => {
    Book.find({}).exec((err, books) => {
        if (err) return next(err)
        res.render("allbook", { books })
    })
}


// get createbook
exports.getCreateBook = (req, res, next) => {
    res.render("createBook")
}

// post createBook
exports.postCreateBook = (req, res, next) => {
    req.body.image = req.file.originalname
    Book.create(req.body, (err, books) => {
        if (err) return next(err)
        res.redirect("/admin/allbook")
    })
}
