
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

//edit campground route


router.get("/:id/edit",campgroundAuthenticator,(req,res)=>{
        Campground.findById(req.params.id,(err,campground)=>{            
                if(campground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit",{campground});
                }
          
        });        
}) 

//update campground route


router.put("/:id",campgroundAuthenticator,(req,res)=>{
    Campground.findOneAndUpdate({_id:req.params.id},{name:req.body.name,image:req.body.image,description:req.body.description},(err,campground)=>{
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
router.delete("/:id",campgroundAuthenticator,(req,res)=>{
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

function campgroundAuthenticator(req,res,next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,(err,campground)=>{
           
            if(err)
            {
                console.log(err);
                res.redirect("back");
            }
            else
            {
                if(campground.author.id.equals(req.user._id)){
                   next();
                }
                else
                {
                   res.redirect("back")
                }
                
            }
        });
    }
    else {
        
        res.redirect("back");
    }
}

module.exports=router;