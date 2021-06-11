const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../models/users");

const Auth = require("../middleware/auth");
const userAuth = require("../middleware/users");
const UserReg = require("../middleware/register");
const Admin = require("../middleware/admin");

router.post("/register",  async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(401).send("Email is already registered");
	const hash = await bcrypt.hash(req.body.password, 10);
	user = new User({
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hash,
		role: "User",
		phone: req.body.phone,
		status: true,
	});
	const result = await user.save();
	if (result) {
		const jwtToken = user.generateJWT();
		res.status(200).send({ jwtToken });
	} else {
		return res.status(400).send("Couldn't register user");
	}
});

router.put("/update", Auth, userAuth, UserReg, async (req, res) => {
	const hash = await bcrypt.hash(req.body.password, 10);
	const userdata = await User.findByIdAndUpdate(req.body._id, {
		_id: req.body._id,
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hash,
		role: req.body.role,
		phone: req.body.phone,
	});
	if (!userdata) return res.status(401).send("Couldn't edit user information");
	return res.status(200).send({ userdata });
});

router.put("/changeStatus", Auth, userAuth, UserReg, async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	const hash = await bcrypt.hash(req.body.password, 10);

	let status = user.status;
	if (status) {
		status = false;
	} else {
		status = true;
	}
	const userdata = await User.findByIdAndUpdate(req.body._id, {
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hash,
		role: req.body.role,
		phone: req.body.phone,
		status: status,
	});
	if (!userdata) return res.status(401).send("Couldn't delete user");
	return res.status(200).send({ user });
});

router.post("/registerAdmin", Auth, userAuth, async (req, res) => {
	if (
		!req.body.roleId ||
		!req.body.rol ||
		!req.body.name ||
		!req.body.lastname ||
		!req.body.email ||
		!req.body.password ||
		!req.body.phone ||
		!req.body.status
	) {
		return res.status(400).send("Incomplete fields");
	}
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("The user is already registered");

	const hash = await bcrypt.hash(req.body.password, 10);

	user = new User({
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		user: req.body.user,
		password: hash,
		status: req.body.status,
		roleId: req.body.roleId,
		rol: req.body.rol,
	});

	try {
		const result = await user.save();
		if (!result) return res.status(401).send("Failed to register user");
		const jwtToken = user.generateJWT();
		res.status(200).send({ jwtToken });
	} catch (e) {
		return res.status(400).send("Failed to register user");
	}
});

module.exports = router;
