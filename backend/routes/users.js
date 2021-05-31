// importar modulos
const express = require("express");
const router = express.Router();

const User = require("../models/users");
const Auth = require("../middleware/auth");

const bcrypt = require("bcrypt");

//* Register
router.post("/register", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(401).send("Email ya se encuentra registrado");
	const hash = await bcrypt.hash(req.body.password, 10);
	user = new User({
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
    console.log(user)
	const hash = await bcrypt.hash(req.body.password, 10);
	const userdata = await User.findByIdAndUpdate(req.body._id, {
		userId: user._id,
		rol: req.body.rol,
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hash,
		phone: req.body.phone
	});
    console.log(userdata);
    console.log(user)

	if (!userdata) return res.status(401).send("No se pudo editar la información del usuario");
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
