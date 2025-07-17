const express = require("express");
const mongoose = require("mongoose");
const List = require("./models/list.js");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

app.get("/lists", async (req, res)=>{
    let listings = await List.find({});
    res.render("listings/index.ejs", {lists:listings});
});

//show route to saw all listings...
app.get("/lists/new", (req, res)=>{
    res.render("listings/new.ejs");
});

//READ route
app.get("/lists/:id", async (req, res)=>{
    let {id} = req.params;
    let list = await List.findById(id);
    res.render("listings/detail.ejs", {list});
});

//CREATE route
app.post("/lists", async (req, res)=>{
    //creating a "list" object using name=list[title] in form for ease.
    //console.log(req.body.list);
    let list = new List(req.body.list); //more readable and understandable as compare to destructured format {title,url,..etc}.
    
    await list.save()
    .then(()=>{console.log("__Data_inserted__")})
    .catch(err => console.log(err));

    res.redirect("/lists");
});

//edit route
app.get("/lists/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let list = await List.findById(id);
    
    res.render("listings/edit.ejs", {list});
}); 

//UPDATE route
app.put("/lists/:id", async(req, res)=>{
    let formList = req.body.list;
    let {id} = req.params;

    await List.findByIdAndUpdate(id, formList);
    res.redirect(`/lists/${id}`);
});

app.delete("/lists/:id", async (req, res)=>{
    let {id} = req.params;
    await List.findByIdAndDelete(id);
    res.redirect("/lists");
});

app.listen("8080", ()=>{
    console.log("__Starts listening__");
});