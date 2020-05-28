var express = require('express');
var router = express.Router();
var userController = require("../controller/users")
var multer = require("multer")
var path = require("path")


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
var upload = multer({ storage: storage })



// multer profile image add 

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
router.get("/register", userController.getRegister)

// post register usser
router.post("/register", upload.single("image"), userController.postRegister)
// login user
// get login user
router.get("/login", userController.getLogin)

// post login user
router.post("/login", userController.postLogin)

// logout user
router.get("/logout", userController.logoutUser)

module.exports = router;
