// import Products from "../models/productModel";
const Products = require("../models/productModel.js");
// const Product = require("../models/productModel.js");
//base de datos

//

const productsController = {
  getProductById: async (req, res) => {
    let product;
    const id = req.params.id;
    try {
      product = await Products.findOne({ _id: id });
      return res.status(200).json({ success: true, product: product });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
    res.json({ product });
  },
  getProducts: async (req, res) => {
    let products;
    try {
      products = await Products.find();
      return res.status(200).json({ success: true, products: products });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  createProduct: async (req, res) => {
    let auxProduct;
    try {
      auxProduct = await Products.create(req.body);
      return res.status(201).json({ success: true, product: auxProduct });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await Products.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      return res.status(200).json({ success: true, product: product });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
      return res
        .status(200)
        .json({ success: true, message: "Producto eliminado" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
};

module.exports = productsController;
