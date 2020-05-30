var User = require("../models/users")
var Category = require("../models/category")



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


