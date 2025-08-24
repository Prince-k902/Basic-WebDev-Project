if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/expressError.js");

//requiring express router
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views")); 
app.use(express.static(path.join(__dirname, "/public")));   
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const sessionOption = {
    secret:"mysecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}

app.use(session(sessionOption));
app.use(flash());

// using passport for authentication.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {   
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    
    res.locals.currUser = req.user; 
    next();
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/air-bnb")
}
main()
.then(()=>{console.log("..connected to [MONGODB]..")})
.catch(err => console.log(err));

app.get("/", (req, res)=>{
    res.render("listings/home.ejs");
});

// app.get("/register", async(req, res) => {
//     const fakeUser = new User({
//         username : "prince-kumar",
//         email : "prince@gmail.com"
//     });
    
//     const registeredUser = await User.register(fakeUser, "mypassword");
//     res.send(registeredUser);
// }); 

//using express router (listings) for /lists
app.use("/lists", listingRouter);
//using express router (reviews) for common part of route in review.js
app.use("/lists/:id/reviews", reviewRouter);

app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Add safe fallback values for status and message
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render("listings/error.ejs", {message});
});

app.listen("8080", ()=>{
    console.log("__Starts listening at 8080__");
});