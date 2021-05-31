// importar modulos
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Auth = require("../middleware/auth");

//* Update de usuarios
router.put("/user/update", Auth, async (req, res) => {
	const user = await User.findById(req.user._id); //* Validamos usuario
	if (!user) return res.status(401).send("No existe el usuario");
	const body = req.body;
	user = await Board.findByIdAndUpdate(body._id, {
		userId: user._id,
		rol: body.rol,
		name: body.name,
		lastName: body.lastName,
		email: body.email,
		password: body.password,
		phone: body.phone,
		status: req.body.status,
	});

	if (!user)
		return res.status(401).send("No se pudo editar la información del usuario");
	return res.status(200).send({ user });
});

// eliminar usuario
router.put("/cambiarStatus", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) return res.status(400).send("El usuario no existe");

	user = await User.findByIdAndUpdate(req.body._id, {
		status: req.body.status,
	});
	return res.status(200).send({ user });
});

// exportar modulo
module.exports = router;
