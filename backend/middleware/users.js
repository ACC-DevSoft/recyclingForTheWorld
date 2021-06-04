const User = require("../models/users");

const user = (req, res, next) => {
    const user = await User.findById( req.user._id);
    if(!user) return res.status(401).send("User not authenticated");
  next();
};

module.exports = user;