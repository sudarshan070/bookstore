var express = require('express');
var router = express.Router();
var passport = require("passport")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect("/users/home");
});

// google auth route
router.get('/auth/google',
  passport.authenticate('google', { scope: ["email", 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/home' }),
  function (req, res) {
    res.redirect('/users/home');
  });

module.exports = router;
