// import Products from "../models/productModel";
const Products = require("../models/productModel.js");
// const Product = require("../models/productModel.js");
//base de datos

//options for pagination
let options = {
  // default page
  page: 1,
  // amount of elements per page
  limit: 2,
};
let notFound = { success: true, products: [], message: "Product/ s not found" };

const productsController = {
  getProductById: async (req, res) => {
    let status;
    let response;
    let product;
    const id = req.params.id;
    try {
      product = await Products.findOne({ _id: id });
      status = 200;
      console.log(product);
      if (product != null) {
        response = { success: true, product: product };
      } else {
        response = notFound;
      }
    } catch (err) {
      status = 500;
      response = {
        success: false,
        error: err,
      };
    }
    return res.status(status).json(response);
  },
  getProducts: async (req, res) => {
    let status;
    let response;
    let products;
    let query = {};
    console.log(req.query);

    // multiple queries
    if (req.query.categorie) {
      query.categorie = req.query.categorie;
    }
    if (req.query._id) {
      query._id = req.query._id;
    }
    if (req.query.name) {
      const auxQuery = req.query.name.replace("_", " ");
      query.name = { $in: new RegExp("^" + auxQuery) };
    }
    try {
      products = await Products.find(query);
      console.log(products);
      if (products.length == 0) {
        status = 404;
        response = notFound;
      } else {
        status = 200;
        response = { success: true, products: products };
      }
      // return res.status(200).json({ success: true, products: products });
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
      // chequear que esto sea correcto en buenas practicas
      // si hay error habria que manejarlo inmediatamente
      // return res.status(500).json({ success: false, error: err });
    }
    return res.status(status).json(response);
  },
  createProduct: async (req, res) => {
    let status;
    let response;
    let auxProduct;
    try {
      auxProduct = await Products.create(req.body);
      status = 201;
      response = { success: true, product: auxProduct };
      // return res.status(201).json({ success: true, product: auxProduct });
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
      // return res.status(500).json({ success: false, error: err });
    }
    return res.status(status).json(response);
  },
  updateProduct: async (req, res) => {
    let status;
    let response;
    try {
      const product = await Products.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      status = 200;
      response = { success: true, product: product };
      // return res.status(200).json({ success: true, product: product });
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
    }
    return res.status(status).json(response);
  },
  deleteProduct: async (req, res) => {
    let status;
    let response;
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
      status = 200;
      response = { success: true, message: "Producto eliminado" };
      // return res
      // .status(200)
      // .json({ success: true, message: "Producto eliminado" });
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
    }
    return res.status(status).json(response);
  },
  getPagination: async (req, res) => {
    let status;
    let response;
    let products;
    try {
      let query = req.query.page;

      // chequear que sea numero valido
      if (query) {
        options.page = query;
      }
      products = await Products.paginate({}, options);
      status = 200;
      response = { success: true, products: products };
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
    }
    return res.status(status).json(response);
  },
};

module.exports = productsController;
