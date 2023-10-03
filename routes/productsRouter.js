const express = require("express");
const productsRouter = express.Router();

const productsController = require("../controllers/productsController");

productsRouter.get("/products", productsController.getProducts);
productsRouter.get("/products/:id", productsController.getProductById);
productsRouter.post("/products", productsController.createProducts);

module.exports = productsRouter;
