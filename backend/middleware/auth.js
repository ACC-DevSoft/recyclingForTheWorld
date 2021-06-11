const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	let jwtToken = req.header("Authorization");
	if (!jwtToken)
		return res
			.status(401)
			.send({ Message: "Authorization declined: there is no token" });

	jwtToken = jwtToken.split(" ")[1];
	if (!jwtToken)
		return res
			.status(401)
			.send({ Message: "Authorization declined: there is no token" });

	try {
		const payload = jwt.verify(jwtToken, process.env.SECRET_kEY_JWT);
		req.user = payload;
		next();
	} catch (error) {
		return res
			.status(401)
			.send({ Message: "Authorization declined: invalid token" });
	}
};

module.exports = auth;
