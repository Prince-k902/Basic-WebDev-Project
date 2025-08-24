const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//passport-local-mongoose always has a user and password , no need to make it in schema.
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);