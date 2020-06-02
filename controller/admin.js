var User = require("../models/users")
var Category = require("../models/category")
var Book = require("../models/books")


// admin dashboard
exports.getDashboard = async (req, res, next) => {
    try {
        var categories = await Category.find({});
        var allUsers = await User.find({});
        var users = allUsers.filter(user => !user.isAdmin)
        res.render("adminDashboard", { categories, users });
    } catch (error) {
        next(error)
    }
}

// get CreateCategory
exports.createCategory = (req, res, next) => {
    console.log(req.session)
    if (req.session) {
        res.render("categoryForm");
    }
}

// post createCategory
exports.postCreateCategory = (req, res, next) => {
    req.body.image = req.file.originalname;
    req.body.userId = req.session.userId;
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

// post edit category
exports.postEditCategory = (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
        if (err) return next(err)
        res.redirect("/admin")
    })
}


// delete category
exports.deleteCategory = async (req, res, next) => {
    try {
        var category = await Category.findByIdAndDelete(req.params.id)
        console.log("deleted")
        res.redirect("/admin")
    } catch (error) {
        next(error)
    }

}

// categorywise books
exports.getCategoryWiseBook = (req, res, next) => {
    if (req.session) {
        Book.find({ category: req.params.name }, (err, books) => {
            return res.render("categoriwiseBook", { books })
        })
    }
}


// get createbook
exports.getCreateBook = async (req, res, next) => {
    try {
        var categories = await Category.find({})
        res.render("createBook", { categories })
    } catch (error) {
        next(error)
    }
}

// post createBook
exports.postCreateBook = (req, res, next) => {
    req.body.image = req.file.originalname
    Book.create(req.body, (err, books) => {
        if (err) return next(err)
        res.redirect("/admin/allBook")
    })
}


// get all book 
exports.getAllBook = (req, res, next) => {
    Book.find({}).exec((err, books) => {
        if (err) return next(err)
        res.render("allbook", { books })
    })
}

// get book detail
exports.getBookDetail = (req, res, next) => {
    Book.findById(req.params.id).exec((err, books) => {
        if (err) return next(err)
        res.render("bookdetail", { books })
    })
}

// get edit book 
exports.getEditBook = async (req, res, next) => {
    try {
        var categories = await Category.find({})
        var books = await Book.findById(req.params.id)
        if (req.session.userId) {
            res.render("editBook", { books, categories })
        }
    } catch (error) {
        next(error)
    }
}

// post edit book
exports.postEditBook = async (req, res, next) => {
    try {
        var books = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/admin/allBook")
    } catch (error) {
        next(error)
    }
}

// delete book
exports.deleteBooks = async (req, res, next) => {
    try {
        var books = await Book.findByIdAndDelete(req.params.id)
        res.redirect("/admin/allBook")
    } catch (error) {
        next(error)
    }
}