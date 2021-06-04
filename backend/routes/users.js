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
	if (user) return res.status(401).send("Email is already registered");
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
		return res.status(400).send("Couldn't register user");
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
	if (!userdata) return res.status(401).send("Couldn't edit user information");
	return res.status(200).send({ userdata });
});

router.put("/changeStatus", Auth, userAuth, async (req, res) => {

	const hash = await bcrypt.hash(req.body.password, 10);
	const user = await User.findOne({ email: req.body.email });
    let status = user.status;
    if (status){
        status = false;
    } else {
        status = true;
    }
	const userdata = await User.findByIdAndUpdate(req.body._id, {
		rol: req.body.rol,
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hash,
		phone: req.body.phone,
        status: status
	});
	if (!userdata) return res.status(401).send("Couldn't delete user");
	return res.status(200).send({ user });
});

router.post("/registerAdmin", Auth, UserAuth, Admin, async (req, res) => {
	if (
	  !req.body.name ||
	  !req.body.email ||
	  !req.body.password ||
	  !req.body.roleId
	)
	  return res.status(400).send("Process failed: Incomplete data");
  
	const validId = mongoose.Types.ObjectId.isValid(req.body.roleId);
	if (!validId) return res.status(401).send("Process failed: Invalid id");
  
	let user = await User.findOne({ email: req.body.email });
	if (user)
	  return res
		.status(400)
		.send("Process failed: The user is already registered");
  
	const hash = await bcrypt.hash(req.body.password, 10);
  
	user = new User({
	  name: req.body.name,
	  email: req.body.email,
	  password: hash,
	  roleId: req.body.roleId,
	  active: true,
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
  

// exportar modulo
module.exports = router;
