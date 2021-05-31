// importar modulos
const express = require("express");
const router = express.Router();

const User = require("../models/users");
const Auth = require("../middleware/auth");

const bcrypt = require("bcrypt");
const Users = require("../models/users");

//* Register
router.post("/register", async (req, res) => {
	let user = await Users.findOne({ email: req.body.email });
	if (!user) return res.status(401).send("Email ya se encuentra registrado");
	const hash = await bcrypt.hash(req.body.password, 10);
	user = new Users({
		rol: "User",
		name: req.body.name,
		lasname: req.body.lasname,
		email: req.body.email,
		password: hash,
		phone: req.body.phone,
		status: true,
	});
	const result = await user.save();
	if (result) {
		const jwtToken = user.generateJWT();
		res.status(200).send({ jwtToken });
	} else {
		return res.status(400).send("No fue posible registrar el usuario");
	}
});

//* Update de usuarios
router.put("/update", Auth, async (req, res) => {
	const user = await User.findById(req.user._id); //* Validamos usuario
	if (!user) return res.status(401).send("No existe el usuario");
	const body = req.body;
	const hash = await bcrypt.hash(body.password, 10);
	user = await Board.findByIdAndUpdate(body._id, {
		userId: user._id,
		rol: body.rol,
		name: body.name,
		lastName: body.lastName,
		email: body.email,
		password: hash,
		phone: body.phone,
		status: req.body.status,
	});

	if (!user)
		return res.status(401).send("No se pudo editar la información del usuario");
	return res.status(200).send({ user });
});

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
