const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 2,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const user = new mongoose.model("users", userSchema);
module.exports = user;