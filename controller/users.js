var User = require("../models/users")


// register user 
exports.getRegister = (req, res, next) => {
    res.render("register")
}

// post  register user
exports.postRegister = (req, res, next) => {
    req.body.image = req.file.originalname;
    User.create(req.body, (err, user) => {
        if (err) return next(err)
        res.redirect("/users/login")
    })
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
        res.redirect("/users/register")
    })
}

// logout user
exports.logoutUser = (req, res, next) => {
    req.session.distory()
    res.redirect("/users/login")
}