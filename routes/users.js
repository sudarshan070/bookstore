var express = require('express');
var router = express.Router();
var userController = require("../controller/users")
var multer = require("multer")
var path = require("path")

// multer profile image add 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
var upload = multer({ storage: storage })





/* GET users listing. */
router.get("/", userController.getSession);

// home route
router.get("/home", userController.homePage)

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

// admin login
// get admin login 
router.get("/admin", (req, res, next) => {
  res.render("adminLogin")
})

router.post("/admin", (req, res, next) => {
  console.log("in admin")
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
})

module.exports = router;
