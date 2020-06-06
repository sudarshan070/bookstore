var express = require('express');
var router = express.Router();
var userController = require("../controller/users")
var reviewController = require('../controller/review')
var multer = require("multer")
var path = require("path")
var auth = require("../middleware/auth")
var Review = require('../models/review')
var Book = require('../models/books')

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

// crete a review 
// review
router.post("/shopping/bookDetail/:bookId/review", async (req, res, next) => {
  try {
    var bookId = req.params.bookId;
    req.body.bookId=bookId
    req.body.author = res.locals.userInfo.name;
    req.body.userId=req.session.userId;
    var review = await Review.create(req.body);
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } }, { new: true });
    console.log(req.body, "-------------")
    res.redirect(`/users/shopping/bookDetail/${bookId}`);
  } catch (error) {
    next(error)
  }
})

router.get('/review/:reviewId/edit', async(req,res,next)=>{
  try {
    var review= await Review.findById(req.params.reviewId)
  
    if(review.userId == req.session.userId){
      res.render('editReview',{review})
      
    }else{
      res.redirect(`/users/shopping/bookDetail/${review.bookId}`)
    }
  } catch (error) {
    next(error)
  }
})
router.post('/review/:reviewId/edit', async(req,res,next)=>{
  try {
    console.log(req.body)
    var review= await Review.findByIdAndUpdate(req.params.reviewId,req.body,{new:true});
    console.log(review,"updated")
    res.redirect(`/users/shopping/bookDetail/${review.bookId}`)
  } catch (error) {
    next(error)
  }
})

router.get('/review/:reviewId/delete',async(req,res,next)=>{
  try {
    var review= await Review.findById(req.params.reviewId);
    if(review.userId == req.session.userId){
    var review=await Review.findByIdAndDelete(req.params.reviewId);
    console.log(review,"fdele");
    }
    res.redirect(`/users/shopping/bookDetail/${review.bookId}`)

  } catch (error) {
    next(error);
  }
})
module.exports = router;
