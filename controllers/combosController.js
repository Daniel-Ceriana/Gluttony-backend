// import Products from "../models/productModel";
const Combos = require("../models/comboModel");
// const Product = require("../models/productModel.js");
//base de datos

const combosController = {
  getComboByProductId: async (req, res) => {
    let status;
    let response;
    let combos;
    let combosFiltrados;
    const id = req.params.id;
    try {
      combos = await Combos.find().populate("products.product");
      status = 200;
      combosFiltrados = combos.filter((combo) =>
        combo.products.find(
          (aProduct) => aProduct.product._id.toString() === id
        )
      );
      response = { success: true, combos: combosFiltrados };
    } catch (err) {
      status = 500;
      response = {
        success: false,
        error: err,
      };
    }
    return res.status(status).json(response);
  },
  getCombos: async (req, res) => {
    let status;
    let response;
    let combos;
    try {
      combos = await Combos.find().populate("products.product");
      if (combos.length == 0) {
        status = 404;
        response = notFound;
      } else {
        status = 200;
        response = { success: true, combos: combos };
      }
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
    }
    return res.status(status).json(response);
  },
  getCombosUnified: async (req, res) => {
    let status;
    let response;
    let combos;
    let query = {};

    // multiple queries
    if (req.params.id) {
      query._id = req.params.id;
    }

    try {
      combos = await Combos.find(query); //Si no hay query de productId trae todos los combos
      console.log(combos);
      if (query.productId) {
        combosF = combos.filter((combo) =>
          combo.products.find(
            (aProduct) =>
              aProduct.product._id.toString() === req.query.productId
          )
        );
        console.log(combosF);
      }
      if (combos.length == 0) {
        status = 404;
        response = notFound;
      } else {
        status = 200;
        response = { success: true, combos: combos };
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
  createCombo: async (req, res) => {
    let status;
    let response;
    let auxCombo;
    try {
      auxProduct = await Combos.create(req.body);
      status = 201;
      response = { success: true, combo: auxCombo };
      // return res.status(201).json({ success: true, product: auxProduct });
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
      // return res.status(500).json({ success: false, error: err });
    }
    return res.status(status).json(response);
  },
  deleteCombo: async (req, res) => {
    let status;
    let response;
    try {
      await Combos.findByIdAndDelete({ _id: req.params.id });
      status = 200;
      response = { success: true, message: "Combo deleted" };
      // return res
      // .status(200)
      // .json({ success: true, message: "Producto eliminado" });
    } catch (err) {
      status = 500;
      response = { success: false, error: err };
    }
    return res.status(status).json(response);
  },
};

module.exports = combosController;
