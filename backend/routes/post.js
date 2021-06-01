//* Express
const express = require("express");
const router = express.Router();

//* Models
const User = require("../models/users");
const Post = require("../models/post");

const Auth = require("../middleware/auth");


router.post("/addPost", Auth, async (req, res) => {
    const user = await User.findById( req.user._id);
    if(!user) return res.status(401).send("Usuario n autenticado");

    const post = new Post({
        userId: user._id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        status: true,
    });

    const savePost = await post.save();
    return res.status(200).send({ savePost });
});


router.put("/updatePost", Auth, async (req, res) =>{
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send({Message: "No se encontro el usuario"});

    const post = await Post.findByIdAndUpdate(req.body._id,{
        userId: user.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        status: req.body.status
    }); 

    if(!post) return res.status(401).send({Message: "No se pudo avtualizar la publicación"});
    return res.status(200).send({post});
});


module.exports = router;