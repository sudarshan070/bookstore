
var User = require("../models/users")

// register user 
exports.getRegister = (req, res, next) => {
    res.render("register")
}

// post  register user
exports.postRegister = (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (err) return next(err)
        res.redirect("/users/login")
    })
}

// get login user
exports.getLogin = (req, res, next) => {
    res.render("login")
}

// posr  login user
exports.postLogin = (req, res, next) => {
    var { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err) return next(err)
        res.redirect("/users/register")
    })
}