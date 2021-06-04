const upload = (req, res, next) => {
	let type = req.files.imgage.type;
	if (type) {
		if (
			type !== "image/png" &&
			type !== "image/jpg" &&
			type !== "image/jpeg" &&
			typw !== "image/gif"
		)
			return res
				.status(401)
				.send("Invalid format: It's only valid .jpg, .jpeg, .png and .gif");
		next();
	} else {
		next();
	}
};


module.exports = upload;