var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Campground= require("./models/campground") ;
var seedDB =require("./seeds");
var Comment=require("./models/comment");
var passport=require("passport");
var User = require("./models/user");
var LocalStrategy=require("passport-local");

seedDB();


mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.static(__dirname+"/public"))

app.use(require("express-session")({
    secret:"reset base stuff",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})


// Campground.create(
//     {
//         name: "duck sack",
//         image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//         description: "first description tester"
//     },
//     function (err, campground) {
//         if (err) { console.log(err); }
//         else {
//             console.log("++++++++++++=======================++++++++++++++++++");
//             console.log(campground);
//         }
//     }


//  )



// var campgrounds =
//     [
//         { name: "duck peak", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c73277ad4914cc05c_340.jpg" },
//         { name: "cat nip", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c73277ad4914cc05c_340.jpg" },
//         { name: "duck sack", image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" }
//     ];

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));



app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
})
app.get("/campgrounds", function (req, res) {

    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds ,currentUser:req.user});
        }
    })




})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description=req.body.description;
    var newCampground = { name: name, image: image,description:description};
    console.log(newCampground); 0
    Campground.create(newCampground, function (err, newCamp) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    })


})

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new.ejs");
})

app.get("/campgrounds/:id", function (req, res) {
    
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
// app.get("/campgrounds/:id", function (req, res) {
    
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



//comment routes 
app.get("/campgrounds/:id/comments/new",isLoggedin,(req,res)=>{
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

app.post("/campgrounds/:id/comments",isLoggedin,(req,res)=>{


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
// app.post("/campgrounds/:id/comments",(req,res)=>{
//     Campground.findById(req.params.id,(err,campground)=>{
//         if(err)
//         {
//             console.log(err);
//             res.redirect("/campgrounds");
//         }
//         else
//         {   
//             console.log(req.body.comment);
//             Comment.create({text:"comment from shite",author:"unhappy"},(err,comment)=>{
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



//==================auth===================
// User.create({
//     username :"admin",
//     password :"4539"
// },(err,user)=>{
//     if(err)
//     {
//         console.log(err)
//     }
//     else
//     {
//         console.log(user);
//     }
// })

app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",(req,res)=>{
    var newUser= new User({username : req.body.username});
    console.log(newUser+req.body.password);
    User.register(newUser,req.body.password,(err,user)=>{
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/campgrounds");
        
        })
    })
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req,res)=>{
    
})

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedin(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");

}


app.listen(3000, function () {

    console.log("yelp camp server is Connected");
})