const express = require("express");
const combosRouter = express.Router();

const combosController = require("../controllers/combosController");

combosRouter.get("/combos", combosController.getCombos);
combosRouter.get("/combos/:id", combosController.getComboByProductId);

combosRouter.post("/combos", combosController.createCombo);
combosRouter.delete("/combos/:id", combosController.deleteCombo);

module.exports = combosRouter;
