const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
}

module.exports.userCreated = async(req, res)=>{
    try{
        const {username, email, password} = req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        //as the user do sign-up, login happen automatically.
        req.login(registeredUser, (err)=>{
            if(err) return next(err);
            req.flash("success", "Welcome to windBNB!");
            res.redirect("/lists");
        });
    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
}

module.exports.userLogin = (req, res)=>{
        req.flash("success", "Welcome back to windBNB");
        if(res.locals.redirectUrlPath)
            res.redirect(res.locals.redirectUrlPath);
        else
            res.redirect("/lists");
}

module.exports.userLogout = (req, res, next)=>{
    req.logout((err)=>{
        if(err)
            return next(err);
        req.flash("success", "Logout successfully!");
        res.redirect("/lists");
    });
}