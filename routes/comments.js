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
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/"+campground._id);

                }
            })
        }
    })
})

router.get("/:comment_id/edit",cheakCommentOwnerShip,(req,res)=>{

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

router.put("/:comment_id",cheakCommentOwnerShip,(req,res)=>{
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


router.delete("/:comment_id",cheakCommentOwnerShip,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    })
})

function isLoggedin(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");

}

function cheakCommentOwnerShip(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,(err,comment)=>{
           
            if(err)
            {
                console.log(err);
                res.redirect("back");
            }
            else
            {
                console.log(comment.author.id);
                if(comment.author.id.equals(req.user._id)){
                   next();
                }
                else
                {
                   res.redirect("back");
                }
                
            }
        });
    }
    else {
        
        res.redirect("back");
    }

}


module.exports=router;
