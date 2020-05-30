var express = require('express');
var router = express.Router();
var auth = require("../middleware/auth")
var passport = require("passport");
var adminController = require("../controller/admin")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect("/home");
});

router.get("/home", (req, res, next) => {
  res.render("home")
})

// google auth route
router.get('/auth/google',
  passport.authenticate('google', { scope: ["email", 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/home' }),
  function (req, res) {
    res.redirect('/admin');
  });



module.exports = router;
