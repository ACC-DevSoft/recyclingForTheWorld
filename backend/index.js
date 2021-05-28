//* Express
const express = require("express");
const app = express();

//* Modulos
const mongoose = require("mongoose");

const uri = 'mongodb+srv://ACC:cZUzVF6w0QAkfJ3F@cluster0.gu5rl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json()); //* Trabjar con jsons

//* Configuración de los puertos del servidor
const port = process.env.PORT || 3025;
app.listen(port, () => console.log("Servidor ejecutando en puerto: " + port));

//* Conexion con MongoDB
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("Conexion con MongoDB ON"))
	.catch((err) => console.log("Error al conectar con MongoDB", err));
