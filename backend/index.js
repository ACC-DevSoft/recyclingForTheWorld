//* Express
const express = require("express");
const app = express();

//* Modulos
const mongoose = require("mongoose");

//*Routes
const User = require("./routes/users");
const Post = require("./routes/post");
const Auth = require("./routes/auth");

const uri = 'mongodb+srv://ACC:cZUzVF6w0QAkfJ3F@cluster0.gu5rl.mongodb.net/recyclingForTheWorld?retryWrites=true&w=majority'

app.use(express.json()); //* Trabjar con jsons

app.use("/api/user/", User);
app.use("/api/post/", Post);
app.use("/api/auth/", Auth);

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
