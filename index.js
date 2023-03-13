const express = require('express');
const bodyParser = require('body-parser');
const ejs =require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose =require('passport-local-mongoose');

const User = require('./models/user')

const app=express();
app.set('view engine' , ' ejs');
app.use(bodyParser.urlencoded(
    {
        extended:true,
    }
))

app.use(session({
    secret : "quiz app",
    resave :false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/DeltaQuiz',{useNewUrlParser:true});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/' , require('./routes'));


app.listen('3000',function(){
    console.log("Server is up!");
})