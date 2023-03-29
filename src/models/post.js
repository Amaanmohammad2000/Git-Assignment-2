const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 2
    },
    body:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
});

const post = new mongoose.model("posts", postSchema);
module.exports = post;