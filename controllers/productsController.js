// import Products from "../models/productModel";
const Product = require("../models/productModel.js");
//base de datos

//

const productsController = {
  getProductById: async (req, res) => {
    let product;
    const id = req.params.id;
    try {
      product = await Product.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
    res.json({ product });
  },
  getProducts: async (req, res) => {
    let product;
    try {
      product = await Product.find();
    } catch (err) {
      console.log(err);
    }
    res.json({ product });
  },
  createProducts: async (req, res) => {
    console.log(req.body);

    // console.log(req.body.data);
    const {
      name,
      brand,
      categorie,
      price,
      description,
      stock,
      hasDiscount,
      bestSeller,
    } = req.body;
    let auxProducts;
    try {
      auxProducts = await new Product({
        name: name,
        brand: brand,
        categorie: categorie,
        price: price,
        description: description,
        stock: stock,
        hasDiscount: hasDiscount,
        bestSeller: bestSeller,
      }).save();
    } catch (error) {
      console.log(error);
    }
    res.json(auxProducts);
  },
};

module.exports = productsController;
