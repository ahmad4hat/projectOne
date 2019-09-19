//all the the middleware 
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObject = {
    campgroundAuthenticator: function (req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, campground) => {

                if (err) {
                    console.log(err);
                    res.redirect("back");
                }
                else {
                    if (campground.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        res.redirect("back")
                    }

                }
            });
        }
        else {

            res.redirect("back");
        }
    },



    cheakCommentOwnerShip: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, comment) => {

                if (err) {
                    console.log(err);
                    res.redirect("back");
                }
                else {
                    console.log(comment.author.id);
                    if (comment.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        res.redirect("back");
                    }

                }
            });
        }
        else {

            res.redirect("back");
        }

    },


    isLoggedin: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");

    }



};

module.exports = middlewareObject;