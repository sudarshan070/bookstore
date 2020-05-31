var express = require('express');
var router = express.Router();
var adminController = require("../controller/admin")
var multer = require("multer")
var path = require("path");
var auth = require("../middleware/auth")



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
var upload = multer({ storage: storage })


// admin dashbord
router.get('/', auth.logged, adminController.getDashboard);
// router.get('/', auth.logged, adminController.getDashboard);

// createCategory of book get route
router.get('/createCategory', auth.logged, adminController.createCategory);

// createCategory of book post route
router.post('/createCategory', auth.logged, upload.single("image"), adminController.postCreateCategory);

// // get edit category
router.get("/:id/edit", adminController.editCategory)

// // post edit category
router.post("/:id/edit", adminController.postEditCategory)

// get all books
router.get("/allbook", adminController.getAllBook)

// Adding Books
// get book route 
router.get("/createBook", adminController.getCreateBook)

// post book route
router.post("/createBook", upload.single("image"), adminController.postCreateBook)

// book detail
// get book detail
router.get("/allBook/detail", adminController.getBookDetail)


module.exports = router;
