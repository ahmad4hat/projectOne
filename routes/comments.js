//comment routes 
const express=require("express");
const router = express.Router({mergeParams:true});
const Campground=require("../models/campground");
const Comment=require("../models/comment");
let middleware=require("../middleware");


router.get("/new",middleware.isLoggedin,(req,res)=>{
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

router.post("/",middleware.isLoggedin,(req,res)=>{


    console.log(req.body.comment);

    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
        {
            req.flash("error","something went wrong");
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
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success","Successfully Added Comments");
                    res.redirect("/campgrounds/"+campground._id);

                }
            })
        }
    })
})

router.get("/:comment_id/edit",middleware.cheakCommentOwnerShip,(req,res)=>{

    Comment.findById(req.params.comment_id,(err,comment)=>{
        if(err)
        {
            res.redirect("back");
        }
        else 
        {
            res.render("comments/edit",{campground_id:req.params.id,comment});
        }
    })    
})

router.put("/:comment_id",middleware.cheakCommentOwnerShip,(req,res)=>{
    console.log(req.body.comment.text);
    console.log(req.params.id);
    // Comment.findByIdAndUpdate(fin,req.body.comment,(err,comment)=>{
    //     if(err)
    //     {
    //         res.redirect("back")
    //     }
    //     else
    //     {
    //         res.redirect("/campgrounds/"+req.params.id);
    //     }
    // })
    Comment.findOneAndUpdate({_id:req.params.comment_id},req.body.comment,(err,comment)=>{
        if(err)
        {
            res.redirect("back")
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


router.delete("/:comment_id",middleware.cheakCommentOwnerShip,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        req.flash("success","comments deleted");
        res.redirect("/campgrounds/"+req.params.id);
    })
})


module.exports=router;
