const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: false },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  imgUrl: { type: String, required: false },
  stock: { type: Number, required: true },
  hasDiscount: { type: Number, required: false, default: 0 },
  bestSeller: { type: String, required: false },
});

productSchema.plugin(mongoosePaginate);

const Products = mongoose.model("products", productSchema);

module.exports = Products;
