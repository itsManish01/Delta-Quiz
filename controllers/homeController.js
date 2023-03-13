const User =require('../models/user');
const passport = require('passport');
module.exports.h = function(req,res){
    let isLoggedin =false;
    if(req.isAuthenticated()) isLoggedin=true;

    res.render('home.ejs',{
        user : isLoggedin
    })
}

module.exports.login = (req,res)=>{
    res.render('login.ejs');
}
module.exports.signup = (req,res)=>{
    res.render('signup.ejs');
}
module.exports.createUser = (req,res)=>{
    console.log(req.body);
    User.register({username:req.body.username,email:req.body.email},req.body.password , (err,user)=>{
        if(err){
            console.log(err);
            res.redirect('/signin');
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/');
            });
        }
    })
}

module.exports.loginUser = function(req,res){
    const user=new User({
        username : req.body.username,
        password : req.body.password
    });
    req.login(user, function(err){
        if(err) console.log(err);
        else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/');
            })
        }
    })
}

module.exports.logoutUser = (req,res)=>{
    req.logout((err)=>{
        if(err) console.log(err);
        else res.redirect('/');
    })
}


module.exports.homePage = (req,res)=>{
    if(req.isAuthenticated()) res.render('homePage.ejs');
    else res.redirect('/login');
}