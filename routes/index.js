var express = require('express');
var router = express.Router();
var auth = require("../middleware/auth")
var passport = require("passport");
var indexController = require("../controller/index")

// add to cart
router.post("/add/:bookId",indexController.addToCart)

// my cart 
router.get("/mycart", indexController.myCart)

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
