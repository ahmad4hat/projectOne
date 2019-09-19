var express=require("express");
var router = express.Router();
var User=require("../models/user");
var passport=require("passport");
router.get("/", function (req, res) {
    res.render("landing");
})


router.get("/register",(req,res)=>{
    res.render("register");
})
router.post("/register",(req,res)=>{
    var newUser= new User({username : req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err)
        {
            req.flash("error",String(err));
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,()=>{
            req.flash("success","Successfully Signned up ,Welcome to yelp camp -"+user.username);
            res.redirect("/campgrounds");
        
        })
    })
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req,res)=>{
    
})

router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","logged you out");
    res.redirect("/campgrounds");
})
module.exports=router;