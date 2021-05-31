// importar modulos
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const Users = require("../models/users");

// logica
router.post('/register', async (req, res) => {
    let user = await Users.findOne({email: req.body.email})
    if(!user) return res.status(401).send('Email ya se encuentra registrado');
    const hash = await bcrypt.hash(req.body.password, 10)
    user = new Users({
        rol: 'User',
        name: req.body.name,
        lasname: req.body.lasname,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        status: true,
    })
    const result = await user.save()
    if (result) {
        const jwtToken = user.generateJWT()
        res.status(200).send({jwtToken})
    } else {
        return res.status(400).send('No fue posible registrar el usuario')
    }

})

// exportar modulo
module.exports = router;


