//* Express
const express = require("express");
const router = express.Router();

//* Models
const User = require("../models/users");
const Post = require("../models/post");

const Auth = require("../middleware/auth");
const userAuth = require("../middleware/users");


router.post("/addPost", Auth, userAuth, async (req, res) => {
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

router.put("/updatePost", Auth, userAuth, async (req, res) =>{
 
    const post = await Post.findByIdAndUpdate(req.body._id,{
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        status: req.body.status
    }); 

    if(!post) return res.status(401).send({Message: "No se pudo avtualizar la publicación"});
    return res.status(200).send({post});
});
router.put("/changeStatus", Auth,userAuth, async (req, res) => {
 
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
});



router.get("/usersPosts", Auth,userAuth, async(req, res) => {
    const post = await Post.find({userId: req.user._id});
    if(!post) return res.status(401).send("error when listing tasks");
    return res.status(200).send({ post });
})

router.get("/getPost", Auth,userAuth, async (req, res) => {
    const post = await Post.find({status: true});
    if(!post) return res.status(401).send("error when listing tasks");
    return res.status(200).send({ post });
})


module.exports = router;