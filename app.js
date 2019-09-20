var express                 = require("express");
var app                     = express();
var mongoose                = require("mongoose");
var Campground              = require("./models/campground") ;
var seedDB                  = require("./seeds");
var Comment                 = require("./models/comment");
var passport                = require("passport");
var User                    = require("./models/user");
var LocalStrategy           = require("passport-local");
var methodOverid            = require("method-override");
var flash                   = require("connect-flash");


//requring routes
var commentRoutes           =   require("./routes/comments"),
    campgroundRoutes        =   require("./routes/campgrounds"),
    indexRoutes             =   require("./routes/index");

//seed the database
//seedDB();


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ahmad:<ahmad>@cluster0-cqzn1.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {  useNewUrlParser: true,
//         useUnifiedTopology: true,
//        useFindAndModify:false});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


mongoose.connect("mongodb+srv://ahmad:ahmad@cluster0-cqzn1.mongodb.net/test?retryWrites=true&w=majority", {
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



app.listen(process.env.PORT,process.env.IP, () => console.log(`Example app listening on port ${process.env.PORT}!`)); 
// app.listen(3000, () => console.log(`Example app listening on port`)); 