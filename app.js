var express = require("express");
var app = express();

var campgrounds =
        [
            { name: "duck peak", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c73277ad4914cc05c_340.jpg" },
            { name: "cat nip", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c73277ad4914cc05c_340.jpg" },
            { name: "duck sack", image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" }
        ];

var bodyParser=require("body-parser");

app.use (bodyParser.urlencoded({extended:true}));



app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
})
app.get("/campgrounds", function (req, res) {
    
    res.render("campgrounds",{ campgrounds : campgrounds });

    
})

app.post("/campgrounds",function(req,res){
    var name =req.body.name;
    var image =req.body.image;
    var newCampground={name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

})

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
})

app.listen(3000, function () {

    console.log("yelp camp server is Connected");
})