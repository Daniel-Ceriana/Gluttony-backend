const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "products" },
      weight: { type: Number },
    },
  ],
  total: { type: Number },
  totalWeight: { type: Number },
});

const Combos = mongoose.model("combos", comboSchema);
module.exports = Combos;
