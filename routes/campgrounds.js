
var express=require("express");
var router = express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
router.get("/", function (req, res) {

    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds ,currentUser:req.user});
        }
    })




})
router.post("/", isLoggedin,function (req, res) {

    var author={
        id:req.user._id,
        username:req.user.username
    };
    var name = req.body.name;
    var image = req.body.image;
    var description=req.body.description;
    var newCampground = {name,image,description,author};
    console.log(newCampground); 
    Campground.create(newCampground, function (err, newCamp) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    })


})

router.get("/new",isLoggedin ,function (req, res) {
    res.render("campgrounds/new.ejs");
})

router.get("/:id", function (req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    })

   
})
// router.get("/campgrounds/:id", function (req, res) {
    
//     Campground.findById(req.params.id,function(err,foundCampground){
//         if(err)
//         {
//             console.log("Something went wrong !");
//         }
//         else
//         {
//             res.render("show",{campground:foundCampground});
//         }
//     })

   
// })


function isLoggedin(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");

}
module.exports=router;

