// importar modulos
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Auth = require("../middleware/auth");

// logica

// eliminar usuario
router.put("/cambiarStatus", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send("El usuario no existe");

    user = await User.findByIdAndUpdate(req.body._id, {
        status: req.body.status
    });
    return res.status(200).send({user});
});
// exportar modulo
module.exports = router;


