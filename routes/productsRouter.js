const express = require("express");
const productsRouter = express.Router();
const passport = require("../config/passport");
const productsController = require("../controllers/productsController");

productsRouter.get("/products", productsController.getProducts);
productsRouter.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  productsController.createProduct
);
productsRouter.get("/products/:id", productsController.getProductById);
productsRouter.put(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  productsController.updateProduct
);
productsRouter.delete(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  productsController.deleteProduct
);

module.exports = productsRouter;
