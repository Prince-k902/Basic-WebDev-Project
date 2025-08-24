const List = require("../models/list.js");
const ExpressError = require("../utils/expressError.js");

module.exports.index = async(req, res)=>{
    let listings = await List.find({});
    res.render("listings/index.ejs", {lists:listings});
}

module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req, res)=>{
    let {id} = req.params;
    //nested populate for getting author of each review.
    let list = await List.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");

    if(!list){
        req.flash("error","Listing do not exists.");
        res.redirect("/lists");
    }
    res.render("listings/detail.ejs", {list});
}

module.exports.createListing = async (req, res, next)=>{
    if(!req.file){
        throw new ExpressError(400, "Image is required");
    }
    const url = req.file.path;
    const filename = req.file.filename;
    //creating a "list" object using name=list[title] in form for ease.
    //console.log(req.body.list);
    let list = new List(req.body.list); //more readable and understandable as compare to destructured format {title,url,..etc}.
    
    list.owner = req.user._id;
    list.image = { filename, url }; 

    await list.save(); // cleaner
    // console.log("__Data_inserted__");
    req.flash("success", "New listing created.");
    res.redirect("/lists");
}

module.exports.showEditForm = async (req, res)=>{
    let {id} = req.params;
    let list = await List.findById(id);
    if(!list){
        req.flash("error","Listing do not exists.");
        res.redirect("/lists");
    }

    let originalImageUrl =list.image.url;
    originalImageUrl = originalImageUrl.replace("upload", "upload/w_200");

    res.render("listings/edit.ejs", {list, originalImageUrl});
}

module.exports.updateListing = async(req, res)=>{
    //postman or hoppscotch request without list.
    if(!req.body.list){
        throw new ExpressError(400, "Give valid details of listing");
    }

    let formList = req.body.list;
    // console.log(formList);
    let {id} = req.params;
    let list = await List.findByIdAndUpdate(id, formList);
    
    if(typeof req.file !== "undefined"){ //way to check something is undefined or not , like if(req.file){...}
        const url = req.file.path;
        const filename = req.file.filename;
        list.image = {filename, url};
        await list.save();
    }

    req.flash("success", "List updated successfully");
    res.redirect(`/lists/${id}`);
}

module.exports.destroyListing = async (req, res)=>{
    let {id} = req.params;
    await List.findByIdAndDelete(id);
    req.flash("success", "List deleted successfully");
    res.redirect("/lists");
}