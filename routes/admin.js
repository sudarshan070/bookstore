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

// Adding Books
// get book route 
router.get("/createBook",auth.logged, adminController.getCreateBook)

// post book route
router.post("/createBook",auth.logged, upload.single("image"), adminController.postCreateBook)

// get all books
router.get("/allBook",auth.logged, adminController.getAllBook)

// get categoriwise books
router.get("/getCategory/:name", auth.logged, adminController.getCategoryWiseBook)

// book detail
// get book detail
router.get("/allBook/:id",auth.logged, adminController.getBookDetail)

// get edit book 
router.get("/allBook/:id/edit", auth.logged, adminController.getEditBook)

// post edit book
router.post("/allBook/:id/edit", auth.logged, adminController.postEditBook)

// delete book
router.get("/allBook/:id/delete", auth.logged, adminController.deleteBooks)

module.exports = router;
