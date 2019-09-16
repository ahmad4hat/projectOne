var mongoose = require("mongoose");
var passportLocalmongose =require("passport-local-mongoose");



var userSchema =new mongoose.Schema({
    username : String,
    password : String
})

userSchema.plugin(passportLocalmongose);
module.exports= mongoose.model("User",userSchema);