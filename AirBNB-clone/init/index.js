const mongoose = require("mongoose");
const List = require("../models/list.js");
const initData = require("./data.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/air-bnb");
}
main()
.then("__Connected to [MONGODB]__")
.catch(err => console.log(err));

async function initDB() {
    await List.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:'68a5f5711617a01fafffa6a5'}));
    await List.insertMany(initData.data);
    console.log("Data was inserted");
}

initDB();