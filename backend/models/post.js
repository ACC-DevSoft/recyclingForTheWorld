// importamos modulos
const mongoose = require("mongoose");


const postSchema  = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    imageUrl: String,
    status: Boolean,
    date:{ type: Date, default: Date.now }
});


const Post = mongoose.model("post", postSchema );

module.exports = Post;
