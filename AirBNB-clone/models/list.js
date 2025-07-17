const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title:{
        type: "String",
    },
    description:{
        type: "String",
    },
    image:{
        filename: {
            type:String,
            default:"listingimage"
        },
        url: {
            type:String,
            default:"https://imgs.search.brave.com/0KfzXZ4fA94M3vs5Dill5laSLGg37YuDRHE-DZWkqgU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi8zZC12/aW50YWdlLWhvdXNl/LWV4dGVyaW9yLWRl/c2lnbi1yZWZlbGN0/aW9uLXdoaXRlLWJh/Y2tnci0zODAwNzI5/Ny5qcGc",
            set : (v) => v===""?"https://imgs.search.brave.com/0KfzXZ4fA94M3vs5Dill5laSLGg37YuDRHE-DZWkqgU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi8zZC12/aW50YWdlLWhvdXNl/LWV4dGVyaW9yLWRl/c2lnbi1yZWZlbGN0/aW9uLXdoaXRlLWJh/Y2tnci0zODAwNzI5/Ny5qcGc":v
        }
    },
    price:{
        type: "Number",
    },
    location:{
        type: "String",
    },
    country:{
        type: "String",
    }
});

let List = mongoose.model("List", listSchema);

module.exports = List;