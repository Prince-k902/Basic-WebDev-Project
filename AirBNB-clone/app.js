const express = require("express");
const mongoose = require("mongoose");
const List = require("./models/list.js");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const listSchema = require("./schema.js");
const Joi = require("joi");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views")); 
app.use(express.static(path.join(__dirname, "/public")));   
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/air-bnb")
}
main()
.then(()=>{console.log("..connected to [MONGODB]..")})
.catch(err => console.log(err));

app.get("/", (req, res)=>{
    res.render("listings/home.ejs");
})

//middleware 
const validateList = (req, res, next) => {
    // joi error handler for validation 
    let {error} = listSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
}

app.get("/lists", wrapAsync( async(req, res)=>{
    let listings = await List.find({});
    res.render("listings/index.ejs", {lists:listings});
}));

//show route to saw all listings...
app.get("/lists/new", (req, res)=>{
    res.render("listings/new.ejs");
});

//READ route
app.get("/lists/:id", wrapAsync( async(req, res)=>{
    let {id} = req.params;
    let list = await List.findById(id);
    res.render("listings/detail.ejs", {list});
}));

//CREATE route
app.post("/lists", validateList, wrapAsync( async (req, res, next)=>{

    //creating a "list" object using name=list[title] in form for ease.
    //console.log(req.body.list);
    let list = new List(req.body.list); //more readable and understandable as compare to destructured format {title,url,..etc}.
    
    await list.save(); // cleaner
    console.log("__Data_inserted__");

    res.redirect("/lists");
}));

//edit route
app.get("/lists/:id/edit", wrapAsync( async (req, res)=>{
    let {id} = req.params;
    let list = await List.findById(id);
    
    res.render("listings/edit.ejs", {list});
})); 

//UPDATE route
app.put("/lists/:id", wrapAsync( async(req, res)=>{
    if(!req.body.list){
        throw new ExpressError(400, "Give valid details of listing");
    }

    let formList = req.body.list;
    let {id} = req.params;

    await List.findByIdAndUpdate(id, formList);
    res.redirect(`/lists/${id}`);
}));

app.delete("/lists/:id", wrapAsync( async (req, res)=>{
    let {id} = req.params;
    await List.findByIdAndDelete(id);
    res.redirect("/lists");
}));

//app.all("*", ...); -> Catch-all route for unmatched paths.
/*app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next)=>{
    let {status, message} = err;
    res.status(status).send(message);
});*/

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