var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String

});
var Campground = mongoose.model("Campground", campgroundSchema);
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
            res.render("index", { campgrounds: campgrounds });
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
    res.render("new.ejs");
})

app.get("/campgrounds/:id", function (req, res) {
    
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
        {
            console.log("Something went wrong !");
        }
        else
        {
            res.render("show",{campground:foundCampground});
        }
    })

   
})

app.listen(3000, function () {

    console.log("yelp camp server is Connected");
})