var express = require('express');
var router = express.Router();
var userControllwer = require("../controller/users")

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session && req.session.userId) {
    console.log(req.session);
    return res.send("respond with a resource");
  } else {
    res.redirect("/users/login");
  }
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
