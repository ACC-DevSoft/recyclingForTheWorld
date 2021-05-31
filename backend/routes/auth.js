// importar modulos
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//Logica 
router.post("/login/", async (req, res)=>{
    const user = await User.findOne({username:req.body.username});
    if(!user) return res.status(401).send({Message : "Usuario y/o contraseña incorrectos"});

    const hash = await  bcrypt.compare(req.body.password, user.password);
    if(!hash) return res.status(401).send({Message : "Usuario y/o contraseña incorrectos"});

    const jwtToken = await User.generateToken();
    return res.status(200).send({jwtToken});
});

// exportar modulo
module.exports = router;
