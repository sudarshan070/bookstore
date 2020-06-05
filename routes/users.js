var express = require('express');
var router = express.Router();
var userController = require("../controller/users")
var multer = require("multer")
var path = require("path")
var auth = require("../middleware/auth")

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



// Headers
// router.get("/allboks", userController.header)

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

// get all book
router.get("/allbooks", auth.logged, userController.getAllBook)

// shoppig route
router.get("/shopping", auth.logged, userController.shopping)

// categorywiseBooks
router.get('/shopping/:name', userController.userSideBooks)

// book detail
router.get("/shopping/bookDetail/:id", userController.singleBookDetail)



module.exports = router;
