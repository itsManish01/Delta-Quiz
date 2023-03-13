const passport =require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email: String,
    password : String
})
userSchema.plugin(passportLocalMongoose);
const User= mongoose.model("User",userSchema);
module.exports = User;