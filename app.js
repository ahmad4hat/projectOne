var express                 = require("express");
var app                     = express();
var mongoose                = require("mongoose");
var Campground              = require("./models/campground") ;
var seedDB                  = require("./seeds");
var Comment                 = require("./models/comment");
var passport                = require("passport");
var User                    = require("./models/user");
var LocalStrategy           = require("passport-local");


//requring routes
var commentRoutes           =   require("./routes/comments"),
    campgroundRoutes        =   require("./routes/campgrounds"),
    indexRoutes             =   require("./routes/index");

//seed the database
//seedDB();


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
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);




app.listen(3000, function () {

    console.log("yelp camp server is Connected");
})