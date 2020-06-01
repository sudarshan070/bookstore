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

// createCategory of book get route
router.get('/createCategory', auth.logged, adminController.createCategory);

// createCategory of book post route
router.post('/createCategory', auth.logged, upload.single("image"), adminController.postCreateCategory);

 // get edit category
router.get("/:id/edit", auth.logged, adminController.editCategory)

 // post edit category
router.post("/:id/edit", auth.logged, adminController.postEditCategory)

// delete category
router.get("/:id/delete", auth.logged, adminController.deleteCategory)

// get all books
router.get("/allbook",auth.logged, adminController.getAllBook)

// Adding Books
// get book route 
router.get("/createBook",auth.logged, adminController.getCreateBook)

// post book route
router.post("/createBook",auth.logged, upload.single("image"), adminController.postCreateBook)

// book detail
// get book detail
router.get("/allBook/detail",auth.logged, adminController.getBookDetail)


module.exports = router;
