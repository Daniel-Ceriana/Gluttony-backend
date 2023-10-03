const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: false },
  categorie: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  stock: { type: Number, required: true },
  hasDiscount: { type: Number, required: false, default: 0 },
  bestSeller: { type: String, required: false },
});

const Products = mongoose.model("product", productSchema);

module.exports = Products;
