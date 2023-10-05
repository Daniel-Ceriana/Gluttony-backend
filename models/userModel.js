const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: String, required: true },
  //   verificar dni
  email: { type: String, required: true },
  cellphone: { type: String, required: false },
  street: { type: String, required: false },
  city: { type: Number, required: false, default: "" },
  state: { type: String, required: false },
  postalCode: { type: Number, required: false },
  country: { type: String, required: false },
  //   cart: { type: Array, required: false },
  // objeto carrito
  //   buyhistory: { type: String, required: false },
  // productos/fechas/etc
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
