// importar los modulos utilizar 
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

<<<<<<< HEAD
// logica 
const userSchema = new mongoose.Schema({
    rol: String,
    name: String, 
    lastName: String,
    email: String, 
    password:String,
    phone: String,
    status: String,
    date: {type: Date, default:Date.now}
});
<<<<<<< HEAD
=======
// logica
>>>>>>> david
=======
>>>>>>> aleja

userSchema.methods.generateJWT = function() {
    return jwt.sign({
        _id:this._id,
        name:this.name,
        status:this.status,
        iat:moment().unix()
    },"reciclerJWT")
}
<<<<<<< HEAD
=======

const User = mongoose.model('users', userSchema)
>>>>>>> aleja

const User = mongoose.model('users', userSchema)

// exportar modelo
module.exports = User;