const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.BD_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("Conexion con MongoDB ON");
	} catch (error) {
		console.log("Error al conectar con MongoDB", err);
		throw new Error("Error al conectar a MongoDB");
	}
};

module.exports = { dbConnection };
