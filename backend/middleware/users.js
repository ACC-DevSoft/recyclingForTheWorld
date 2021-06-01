const User = require("../models/users");

const user = async (req, res, next) => {
    const user = await User.findById( req.user._id);
    if(!user) return res.status(401).send("Usuario no autenticado");
  next();
};

module.exports = user;