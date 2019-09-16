//comment routes 
var express=require("express");
var router = express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
router.get("/new",isLoggedin,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.render("comments/new",{campground});
        }
    
    })
    
    
})

router.post("/",isLoggedin,(req,res)=>{


    console.log(req.body.comment);

    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            Comment.create(req.body.comment,(err,comment)=>{
                if(err)
                {
                    console.log(err);
                    res.redirect("/campgrounds");
                }
                else
                {
                    console.log("coments added to database");
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);

                }
            })
        }
    })
})
// router.post("",(req,res)=>{
//     Campground.findById(req.params.id,(err,campground)=>{
//         if(err)
//         {
//             console.log(err);
//             res.redirect("/campgrounds");
//         }
//         else
//         {   
//             console.log(req.body.comment);
//             Comment.create({text:"comment from shite",author:"unhroutery"},(err,comment)=>{
//                 if(err)
//                 {
//                     console.log(err);
//                 }
//                 else 
//                 {
//                     console.log(comment);
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect("/campgrounds/"+campground._id);
//                 }
                
//             })
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
