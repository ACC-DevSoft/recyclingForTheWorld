const express = require("express");
const cors = require("cors");
const {dbConnection} = require("./db/db");
require("dotenv").config();

const User = require("./routes/users");
const Post = require("./routes/post");
const Auth = require("./routes/auth");
const Role = require("./routes/role");

const app = express();

app.use(express.json());

app.use(cors());
app.use("/api/user/", User);
app.use("/api/post/", Post);
app.use("/api/auth/", Auth);
app.use("/api/role/", Role);

app.listen(process.env.PORT, () =>
	console.log("Servidor ejecutando en puerto: " + process.env.PORT)
);

dbConnection();