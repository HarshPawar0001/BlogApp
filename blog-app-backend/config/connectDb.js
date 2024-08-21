const {DB_URL} = require("./index");
const mongoose = require("mongoose");

const connectDB = () => { 
    // console.log("db connected");
    return mongoose.connect(DB_URL);
};

module.exports = connectDB;