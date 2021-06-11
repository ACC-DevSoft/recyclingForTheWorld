const user = async (req, res, next) => {
	const user = req.body;
	if (
		!user.rol ||
		!user.name ||
		!user.lastname ||
		!user.email ||
		!user.password ||
		!user.phone ||
		!user.status ||
		user.rol == "" ||
		user.name == "" ||
		user.lastname == "" ||
		user.email == "" ||
		user.password == "" ||
		user.phone == "" ||
		user.status == ""
	)
		return res.status(401).send("All fields are required");
	next();
};

module.exports = user;
