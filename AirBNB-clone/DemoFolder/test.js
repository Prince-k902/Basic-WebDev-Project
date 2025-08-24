const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

const sessionOption = {
    secret:"mysecret", 
    resave:false, 
    saveUninitialized:true
};
app.use(session(sessionOption));
app.use(flash());
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));


app.get("/register", (req, res) => {
    const {name="anonymous"} = req.query;
    req.session.name = name;
    if(name ==="anonymous")
        req.flash("error","You do not registered!");
    else
        req.flash("success","You registered successfully!");
    res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
    res.render("show.ejs", {name:req.session.name});
});


// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }   
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You visit ${req.session.count} times.`);
// });

app.listen(3000, ()=>{
    console.log("Listening at port 3000");
});