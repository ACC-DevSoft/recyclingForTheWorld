// importamos modulos
const mongoose = require("mongoose");


const postSchema  = new mongooose.schema ({
    userId: String,
    title: String,
    description: String,
    imageUrl: String,
    status: Boolean,
    date:{ type: Date, default: Date.now }
});


const Post = mongoose.model("post", postSchema );

module.exports = Post;
