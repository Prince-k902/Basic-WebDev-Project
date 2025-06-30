const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [];

app.get("/", (req, res)=>{
    res.render("welcome.ejs");
})

app.get("/posts", (req, res)=>{
    res.render("posts.ejs", {posts});
})

app.get("/posts/:id/details", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((user) => user.id === id);

    res.render("details.ejs", {post});
})

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    posts.push({id:uuidv4(), username:username, content:content});
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find( (user)=> user.id === id );
    res.render("edit.ejs", {post});
})

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((user)=> user.id === id);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
})

app.listen(port, ()=>{
    console.log("App start listening.");
});