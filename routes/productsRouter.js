const express = require("express");
const productsRouter = express.Router();

const productsController = require("../controllers/productsController");

productsRouter.get("/products", productsController.getProducts);
productsRouter.post("/products", productsController.createProduct);
productsRouter.get("/products/:id", productsController.getProductById);
productsRouter.put("/products/:id", productsController.updateProduct);
productsRouter.delete("/products/:id", productsController.deleteProduct);
productsRouter.get("/test", productsController.getProductByName);
module.exports = productsRouter;
