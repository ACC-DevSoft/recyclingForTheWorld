// importar modulos
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users");

const Auth = require("../middleware/auth");
const userAuth = require("../middleware/users");


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
router.put("/update", Auth, userAuth, async (req, res) => {
	
	const hash = await bcrypt.hash(req.body.password, 10);
	const userdata = await User.findByIdAndUpdate(req.body._id, {
        _id: req.body._id,
		rol: req.body.rol,
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hash,
		phone: req.body.phone
	});
	if (!userdata) return res.status(401).send("No se pudo editar la información del usuario");
	return res.status(200).send({ user });
});

router.put("/changeStatus", Auth, userAuth, async (req, res) => {

	const hash = await bcrypt.hash(req.body.password, 10);
    let status = user.status;
    if (status){
        status = false;
    } else {
        status = true;
    }
	const userdata = await User.findByIdAndUpdate(req.body._id, {
        _id: user._id,
		rol: req.body.rol,
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hash,
		phone: req.body.phone,
        status: status
	});
	if (!userdata) return res.status(401).send("No se pudo eliminar el usuario");
	return res.status(200).send({ user });
});



// exportar modulo
module.exports = router;
