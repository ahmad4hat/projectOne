const express                 = require("express");
const app                     = express();
const mongoose                = require("mongoose");
const Campground              = require("./models/campground") ;
const seedDB                  = require("./seeds");
const Comment                 = require("./models/comment");
const passport                = require("passport");
const User                    = require("./models/user");
const LocalStrategy           = require("passport-local");
const methodOverid            = require("method-override");
const flash                   = require("connect-flash");


//requring routes
const commentRoutes           =   require("./routes/comments"),
    campgroundRoutes        =   require("./routes/campgrounds"),
    indexRoutes             =   require("./routes/index");





const databaseUrl=process.env.DATABASE_STRING || "mongodb://localhost:27017/yelp_camp";

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   useFindAndModify:false
});

// mongoose.connect("mongodb://localhost:27017/yelp_camp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//    useFindAndModify:false
// });
app.use(express.static(__dirname+"/public"));
app.use(methodOverid("_method"));


app.use(flash());
app.use(require("express-session")({
    secret:"reset base stuff",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   




var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");



app.use(function(req,res,next){
    // console.log(req.flash("error"));
    res.locals.currentUser=req.user;
    res.locals.error=String(req.flash("error"));
    res.locals.success=String(req.flash("success"));
    next();
})
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



 app.listen(process.env.PORT || 3000,process.env.IP, () => console.log(`Example app listening on port ${process.env.PORT}!`)); 
// app.listen(3000, () => console.log(`Example app listening on port`)); 