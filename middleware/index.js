//all the the middleware 
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObject = {
    campgroundAuthenticator: function (req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, campground) => {

                if (err) {
                    req.flash("error","Campgoround not /Something went wrong with the data base");
                    res.redirect("back");
                }
                else {
                    if (campground.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        res.flash("error","You do not own this post , you don't have perrmission to do that");
                        res.redirect("back")
                    }

                }
            });
        }
        else {

            req.flash("error","You need to Logged in to do that");
            res.redirect("back");
        }
    },



    cheakCommentOwnerShip: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, comment) => {

                if (err) {
                    console.log(err);
                    req.flash("error","Comment not found/Something went wrong with the data base");
                    res.redirect("back");
                }
                else {

                    if (comment.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        req.flash("error","Comment is not yours");
                        res.redirect("back");
                    }

                }
            });
        }
        else {
            req.flash("error","you need to be logged in");
            res.redirect("back");
        }

    },


    isLoggedin: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error","You need to be Logged in to do that ");
        res.redirect("/login");

    }



};

module.exports = middlewareObject;