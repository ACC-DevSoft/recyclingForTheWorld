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

    const hash = await bcrypt.hash(req.body.password, 10)
    user = await User.findByIdAndUpdate(req.body._id, {
    rol: req.body.rol,
    name: req.body.name, 
    lastName: req.body.lastName,
    email: req.body.email, 
    password:hash,
    phone: req.body.phone,
    status: req.body.status
    });
    return res.status(200).send({user});
});
// exportar modulo
module.exports = router;


