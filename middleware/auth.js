var User = require("../models/users")

exports.logged = (req, res, next) => {
    if (req.session.userId || req.session.passport) {
        console.log(req.session.userId)
        next()
    } else {
        res.redirect("/users/login")
    }
}


exports.userInfo = (req, res, next) => {
    if (req.session.passport) {
        req.session.userId = req.session.passport.user;
        req.session.userName = req.session.passport.user.name || "";
        User.findById(
            req.session.userId,
            { email: 1, name: 1, userId: 1, image: 1, isVerified: 1,isblock:1 },
            (err, user) => {
                if (err) return next(err)
                req.user = user
                res.locals.userInfo=  user ;
                next();
            }
        )
    } else if (req.session.userId) {
        User.findById(req.session.userId,
            { email: 1, name: 1, userId: 1, image: 1, isVerified: 1 ,isblock:1},
            (err, user) => {
                if (err) return next(err);
                req.user = user
                res.locals.userInfo = user
                next();
            }
        )
    } else {
        req.user = ''
        res.locals.userInfo =" " 
        next()
    }
}