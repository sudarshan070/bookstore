var express = require('express');
var router = express.Router();
var auth = require("../middleware/auth")
var passport = require("passport");
var Book = require('../models/books');
var Booklist = require('../models/booklist')
var Cart = require('../models/cart');
var User = require('../models/users')

/* GET home page. */

// add to cart
router.post("/add/:bookId", async (req, res, next) => {
  try {
    var book = await Book.findById(req.params.bookId);
    var booklist= await Booklist.findOne({book:book.id});
    var cart = await Cart.findOne({userId:req.user.id})
    if(booklist){
      var booklist= await Booklist.findByIdAndUpdate(booklist.id,{$inc:{qty:req.body.qty}},{new:true});
    }else{
      req.body.book= book.id;
      req.body.cart=cart.id
      var booklist= await Booklist.create(req.body);
      var cart= await Cart.findByIdAndUpdate(cart.id,{$addToSet:{bookList:booklist.id}},{new:true})
     
    }
    res.redirect(`/users/shopping/bookDetail/${book.id}`)
  } catch (error) {
    next(error)
  }
})

// my cart 
router.get("/mycart", async(req,res,next)=>{
  try {
    var cart= await Cart.findOne({userId:req.user.id});
    console.log(cart,"cart")
    var  booklist= await Booklist.find({cart:cart.id});
    console.log(booklist,"here we get")
    res.render('mycart',{booklist})
  } catch (error) {
    next(error)
  }
})

router.get('/', function (req, res, next) {
  res.redirect("/home");
});

router.get("/home", (req, res, next) => {
  res.render("home")
})

// google auth route
router.get('/auth/google',
  passport.authenticate('google', { scope: ["email", 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/home' }),
  function (req, res) {
    res.redirect('/admin');
  });


module.exports = router;
