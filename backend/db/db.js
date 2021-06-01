const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.BD_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("Connected with MongoDB");
	} catch (error) {
		console.log("Error while tring to connect with MongoDB", err);
		throw new Error("Error while tring to connect with MongoDB");
	}
};

module.exports = { dbConnection };
