
var mongoose = require("mongoose");
var Campgound =require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name: "Stars dank",
        image : "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis deleniti, rem neque aspernatur in temporibus suscipit unde nam. Ullam consectetur velit dolor dolores labore pariatur deleniti. Eveniet quod ducimus distinctio autem sit. Numquam, facere nam reiciendis perspiciatis voluptates sequi doloremque architecto eaque nulla optio illum. Accusantium ad quod eius harum consectetur. Dicta deserunt sequi officia iusto neque expedita aliquid suscipit."
    },
    {
        name: "Fire Dank",
        image : "https://images.unsplash.com/photo-1533086723868-6060511e4168?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80",
        description :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis deleniti, rem neque aspernatur in temporibus suscipit unde nam. Ullam consectetur velit dolor dolores labore pariatur deleniti. Eveniet quod ducimus distinctio autem sit. Numquam, facere nam reiciendis perspiciatis voluptates sequi doloremque architecto eaque nulla optio illum. Accusantium ad quod eius harum consectetur. Dicta deserunt sequi officia iusto neque expedita aliquid suscipit."
    },
    {
        name: "lonely dank",
        image : "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80",
        description :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis deleniti, rem neque aspernatur in temporibus suscipit unde nam. Ullam consectetur velit dolor dolores labore pariatur deleniti. Eveniet quod ducimus distinctio autem sit. Numquam, facere nam reiciendis perspiciatis voluptates sequi doloremque architecto eaque nulla optio illum. Accusantium ad quod eius harum consectetur. Dicta deserunt sequi officia iusto neque expedita aliquid suscipit."
    }
];


module.exports = () =>{
    Campgound.deleteMany({},function(err){
        // if(err)
        // {
        //     console.log(err);
        // }
        // else{
        //     console.log("removed campgrounds !");
        //     data.forEach((seed)=>{
        //         Campgound.create(seed,(err,campground)=>{
        //             if(err)
        //             {
        //                 console.log(err)
        //             }
        //             else
        //             {
        //                 console.log("campground added");
        //                 Comment.create({
        //                     text:"This place is great and awesome",
        //                     author :"Homer"
        //                 },(err,comment)=>{
        //                     if(err)
        //                     {
        //                         console.log(err);
        //                     }
        //                     else 
        //                     {
        //                        campground.comments.push(comment);
        //                        campground.save();
        //                        console.log("crated a new comment");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
        
    });

    
}