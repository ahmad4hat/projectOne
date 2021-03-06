
var express=require("express");
var router = express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/", function (req, res) {

    Campground.find({}, function (err, campgrounds) {
        if (err) {
            req.flash("error","Something went Wrong with the database");
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds ,currentUser:req.user});
        }
    })




})
router.post("/",middleware.isLoggedin,function (req, res) {

    var author={
        id:req.user._id,
        username:req.user.username
    };
    var name = req.body.name;
    var image = req.body.image;
    var description=req.body.description;
    var newCampground = {name,image,description,price:req.body.price,author};
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

//edit campground route


router.get("/:id/edit",middleware.campgroundAuthenticator,(req,res)=>{
        Campground.findById(req.params.id,(err,campground)=>{  
                 
                if(campground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit",{campground});
                }
          
        });        
}) 

//update campground route


router.put("/:id",middleware.campgroundAuthenticator,(req,res)=>{
    Campground.findOneAndUpdate({_id:req.params.id},{name:req.body.name,price:req.body.price,image:req.body.image,description:req.body.description},(err,campground)=>{
        if(err)
        {
            console.log(err);
            res.redirect("/campgounds");
        }

        res.redirect("/campgrounds/"+req.params.id);
        
    })
})
//delelate
// router.delete("/:id",(req,res)=>{
    
//     Campground.findByIdAndRemove(req.params.id,(err)=>
//     {
//         if(err)
//         {
//             res.redirect("/campgrounds");
//         }
//         res.redirect("/campgrounds")
//     }

// })
router.delete("/:id",middleware.campgroundAuthenticator,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    })
})



//new campgrond route
router.get("/new",middleware.isLoggedin ,function (req, res) {
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



module.exports=router;