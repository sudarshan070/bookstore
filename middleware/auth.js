var User = require("../models/users")

exports.logged = (req, res, next) => {
    console.log(req.session.userId, "auth req.session.userId")
    console.log(req.session.passport, "auth req.session.pass")
    console.log(req.session, "req.session")
    console.log(req.session.passport.user.id, "req.session.passport.user.id")
    if (req.session.userId || req.session.passport) {
        return next()
    }
}
// exports.verifyAdmin = (req, res, next) => {
//     if (req.session.userId) {
//         return next()
//     }
// }

exports.userInfo = (req, res, next) => {
    if (req.session.passport) {
        req.session.userId = req.session.passport.user
        console.log(req.session.userId, "auth req.session.userId")
        console.log(req.session.passport.user, "auth req.session.passport.user")
        User.findById(
            req.session.userId,
            { email: 1, name: 1, userId: 1, image: 1 },
            (err, user) => {
                if (err) return next(err)
                req.user = user
                req.locals = { admin: user }
                next();
            }
        )
    } else if (req.session.userId) {
        User.findById(req.session.userId,
            { email: 1, name: 1, userId: 1, image: 1 },
            (err, user) => {
                if (err) return next(err)
                req.user = user
                res.locals.userInfo = user
                next()
            }
        )
    } else {
        req.user = null
        res.locals.user = null
        next()
    }
}