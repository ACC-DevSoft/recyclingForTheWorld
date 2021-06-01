//* Express
const express = require("express");
const router = express.Router();

//* Models
const User = require("../models/users");
const Post = require("../models/post");

const Auth = require("../middleware/auth");


router.post("/addPost", Auth, async (req, res) => {
    const user = await User.findById( req.user._id);

    if(!user) return res.status(401).send("Usuario no autenticado");

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

router.put("/changeStatus", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send("Usuario no autenticado");
    const post = await Post.findById(req.body._id);
    if(!post) return res.status(401).send("El Post No existe")
    let status = post.status;
    if (status) {
        status = false;
    } else {
        status = true;
    } 
    const postData = await Post.findByIdAndUpdate(req.body._id, {
        _id: req.body._id,
        userId: user._id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        status: status,
    });
    if(!postData) return res.status(401).send("No se pudo Eliminar el post");
    return res.status(200).send({postData})
})

module.exports = router;