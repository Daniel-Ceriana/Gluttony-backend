const express = require("express");
const combosRouter = express.Router();

const combosController = require("../controllers/combosController");

combosRouter.get("/combos", combosController.getCombos);
combosRouter.get("/combos/:id", combosController.getCombosById);

combosRouter.post("/combos", combosController.createCombo);
combosRouter.delete("/combos/:id", combosController.deleteCombo);
combosRouter.put("/combos/:id", combosController.updateCombo);
module.exports = combosRouter;
