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


// verify user
router.post("/:email/verify", userController.nodemailer)

// shoppig route
router.get("/shopping", userController.shopping)

module.exports = router;
