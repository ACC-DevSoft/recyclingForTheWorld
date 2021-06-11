const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: String,
	lastName: String,
	email: String,
	password: String,
	roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
	phone: String,
	status: Boolean,
	date: { type: Date, default: Date.now },
});

userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{
			_id: this._id,
			name: this.name,
			roleId: this.roleId,
			status: this.status,
			iat: moment().unix(),
		},
		process.env.SECRET_kEY_JWT
	);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
