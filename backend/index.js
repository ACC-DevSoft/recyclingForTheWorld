//* Express
const express = require("express");
const app = express();

//* Modulos
const mongoose = require("mongoose");


app.use(express.json()); //* Trabjar con jsons

//* Configuración de los puertos del servidor
const port = process.env.PORT || 3025;
app.listen(port, () => console.log("Servidor ejecutando en puerto: " + port));

//* Conexion con MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/recyclersdb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("Conexion con MongoDB ON"))
	.catch((err) => console.log("Error al conectar con MongoDB", err));
