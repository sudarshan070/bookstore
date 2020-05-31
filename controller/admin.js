
var Category = require("../models/category")
var Book = require("../models/books")


// admin dashboard
exports.getDashboard = (req, res, next) => {
    Category.find({}).exec((err, category) => {
        if (err) return next(err)
        res.render("adminDashboard", { category });
    })
}

// get CreateCategory
exports.createCategory = (req, res, next) => {
    console.log(req.session, req.session.userId, "========")
    if (req.session && req.session.userId) {
        res.render("categoryForm");
    }
}

// post createCategory
exports.postCreateCategory = (req, res, next) => {
    req.body.image = req.file.originalname;
    req.body.userId = req.session.userId;
    //   req.body.author = res.locals.userInfo.name;
    Category.create(req.body, (err, category) => {
        if (err) return next(err)
        res.redirect("/admin")
    })
}
// eddit category
exports.editCategory = (req, res, next) => {
    Category.findById(req.params.id, (err, category) => {
        if (req.session.userId) {
            if (err) return next(err)
            res.render("editCategory", { category })
        }
    })
}

// // post edit category
exports.postEditCategory = (req, res, next) => {
    try {
        console.log("in edit ")
    } catch (error) {
        next(error)
    }
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


// get book detail
exports.getBookDetail = (req, res, next) => {
    res.render("bookdetail")
}