//* Express
const express = require("express");
const mongoose = require("mongoose");

const User = require("./routes/users");
const Auth = require("./routes/auth");
const Post = require("./routes/post");

const uri = 'mongodb+srv://ACC:cZUzVF6w0QAkfJ3F@cluster0.gu5rl.mongodb.net/recyclingForTheWorld?retryWrites=true&w=majority'

const app = express();
app.use(express.json()); // Trabjar con jsons

app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/post/", Post);

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
