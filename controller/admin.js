var User = require("../models/users")
var Category = require("../models/category")



exports.getDashboard = (req, res, next) => {
    Category.find({}).exec((err, category) => {
        if (err) return next(err)
        console.log(category, "+++++++++++++dhashboard")
        res.render("adminDashboard", { category });
    })
}

// get CreateCategory
exports.createCategory = (req, res, next) => {
    // console.log(req.session, "++++++++", req.session.userId, "user id")
    res.render("categoryForm");
}

// post createCategory
exports.postCreateCategory = (req, res, next) => {
    req.body.image = req.file.originalname;
    Category.create(req.body, (err, category) => {
        // console.log(category)
        if (err) return next(err)
        res.redirect("/admin")
    })
}


