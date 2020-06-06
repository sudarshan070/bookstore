var express = require('express');
var router = express.Router();
var adminController = require("../controller/admin")
var multer = require("multer")
var path = require("path");
var auth = require("../middleware/auth");
var User=require('../models/users');



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
router.get('/',  adminController.getDashboard);

// createCategory of book get route
router.get('/createCategory',  adminController.createCategory);

// createCategory of book post route
router.post('/createCategory',  upload.single("image"), adminController.postCreateCategory);

 // get edit category
router.get("/:id/edit",  adminController.editCategory)

 // post edit category
router.post("/:id/edit",  adminController.postEditCategory)

// delete category
router.get("/:id/delete",  adminController.deleteCategory)

// Adding Books
// get book route 
router.get("/createBook", adminController.getCreateBook)

// post book route
router.post("/createBook", upload.single("image"), adminController.postCreateBook)

// get all books
router.get("/allBook", adminController.getAllBook)

// get users
router.get("/users",  adminController.getUsers)

//get block user
router.get('/users/:userId/block',async (req,res,next)=>{
    try {
        var user= await User.findByIdAndUpdate(req.params.userId,{isblock:true},{new:true});
        console.log(user,"user is");
        res.redirect('/admin/users')
    } catch (error) {
        next(error);
    }
})

router.get('/users/:userId/unblock', async(req,res,next)=>{
    try {
        var user= await User.findByIdAndUpdate(req.params.userId,{isblock:false},{new:true})
        console.log(user,"req");
        res.redirect("/admin/users")
    } catch (error) {
        next(error)
    }
})
// get categoriwise books
router.get("/getCategory/:name",  adminController.getCategoryWiseBook)

// book detail
// get book detail
router.get("/allBook/:id", adminController.getBookDetail)

// get edit book 
router.get("/allBook/:id/edit",  adminController.getEditBook)

// post edit book
router.post("/allBook/:id/edit",  adminController.postEditBook)

// delete book
router.get("/allBook/:id/delete",  adminController.deleteBooks)



module.exports = router;
