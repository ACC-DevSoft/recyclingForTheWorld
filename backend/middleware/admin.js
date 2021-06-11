const Role = require("../models/role");

const admin = async (req, res, next) => {
	const role = await Role.findById(req.user.roleId);
	if (!role) {
		return res.status(400).send("Error: The role doesn't exist");
	}

	if (role.name === "admin") {
		next();
	} else {
		res.status(400).send("Error: Unauthorized user");
	}
};

module.exports = admin;
