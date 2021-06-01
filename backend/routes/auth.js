// importar modulos
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users")

//Logica 
router.post("/login", async (req, res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(401).send({Message : "Incorrect login information"});

    const hash = await  bcrypt.compare(req.body.password, user.password);
    if(!hash) return res.status(401).send({Message : "Incorrect login information"});

    const jwtToken = await user.generateJWT();
    return res.status(200).send({jwtToken});
});

// exportar modulo
module.exports = router;
