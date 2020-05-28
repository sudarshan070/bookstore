var User = require("../models/users")

exports.logged = (req, res, next) => {
    if (req.session.userId) {
        return next()
    }
}

exports.userInfo = (req, res, next) => {
    console.log(req.session.userId)
    if (req.session.userId) {
        User.findById(req.session.userId),
            { email: 1, name: 1, userId: 1 },
            (err, user) => {
                if (err) return next(err)
                req.user = user
                res.locals.userInfo = user
                next()
            }
    } else {
        req.user = null
        res.locals.user = null
        next()
    }
}