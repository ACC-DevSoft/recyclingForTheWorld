const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  tipoRol: Number,
  description: String,
  active: Boolean,
  date: { type: Date, default: Date.now },
});

const Role = mongoose.model("role", roleSchema);
module.exports = Role;