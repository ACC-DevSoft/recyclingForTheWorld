const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const User = require("../models/users");
const Post = require("../models/post");



router.put("/updatePost",Auth, async (req, res) =>{
    const user = await User.findById(req.user.id);
    if(!user) return res.status(401).send({Message: "No se encontro el usuario"});

    const post = await Post.findByIdAndUpdate(req.body._id,{
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        status: req.body.status
    }); 

    if(!post) return res.status(401).send({Message: "No se pudo avtualizar la publicación"});
    return res.status(200).send({post});
});


module.exports = router;