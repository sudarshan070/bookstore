var express = require('express');
var router = express.Router();
var userControllwer = require("../controller/users")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with resource');
});

// registe user 
// get register user 
router.get("/register", userControllwer.getRegister)

// post register usser
router.post("/register", userControllwer.postRegister)

// login user
// get login user
router.get("/login", userControllwer.getLogin)

// post login user
router.post("/login", userControllwer.postLogin)

// logout user
router.get("/logout", userControllwer.logoutUser)

module.exports = router;
