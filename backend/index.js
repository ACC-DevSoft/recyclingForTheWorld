//* Express
const express = require("express");
const app = express();

//* Modulos
const mongoose = require("mongoose");

<<<<<<< HEAD
//* Routes
const Users = require('./routes/users');
=======
//*Routes
const User = require("./routes/users");
const Auth = require("./routes/auth");
>>>>>>> aleja

const uri = 'mongodb+srv://ACC:cZUzVF6w0QAkfJ3F@cluster0.gu5rl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json()); //* Trabjar con jsons

<<<<<<< HEAD
app.use('/api/user/',Users)
=======
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
>>>>>>> aleja

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
