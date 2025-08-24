const mongoose = require("mongoose");
const Review = require("./review");

const listSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        filename: {
            type: String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        }
    },
    price:{ 
        type: Number,
    },
    location:{
        type: String,
    },
    country:{
        type: String,
    },
    
    // one to many relationship with reviews
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

//post middleware to delete a list.
listSchema.post("findOneAndDelete", async function(listing){
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews }});
    }
});

let List = mongoose.model("List", listSchema);

module.exports = List;