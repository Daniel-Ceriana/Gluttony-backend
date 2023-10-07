// import Products from "../models/productModel";
const Products = require("../models/productModel.js");
// const Product = require("../models/productModel.js");
//base de datos

//
let options = {
  page: 1,
  limit: 2,
};

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
      // Products.find(req.query) -> para paginacion
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
  getPagination: async (req, res) => {
    let products;
    try {
      let query = req.query.page;

      // chequear que sea numero valido
      if (query) {
        options.page = query;
      }
      products = await Products.paginate({}, options);
      console.log(products);
      // Products.find(req.query) -> para paginacion
      return res.status(200).json({ success: true, products: products });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
};

module.exports = productsController;
