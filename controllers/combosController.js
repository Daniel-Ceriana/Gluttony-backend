const Combos = require("../models/comboModel");
const { handleResponse, handleError } = require("./responseHelpers");

const combosController = {
  getCombos: async (req, res) => {
    try {
      const productId = req.query.productId;
      let combos;

      if (productId) {
        combos = await Combos.find({ "products.product": productId }).populate(
          "products.product"
        );
      } else {
        combos = await Combos.find().populate("products.product");
      }

      if (combos.length === 0) {
        return handleResponse(res, 404, true, {
          message: "No combos were found that include that Product",
          combos: [],
        });
      }

      return handleResponse(res, 200, true, { combos });
    } catch (err) {
      return handleError(res, 500, err);
    }
  },

  getCombosById: async (req, res) => {
    try {
      const combos = await Combos.find({ _id: req.params.id }).populate(
        "products.product"
      );

      if (combos.length === 0) {
        return handleResponse(res, 404, true, {
          message: "No combos were found with that Id",
          combos: [],
        });
      }

      return handleResponse(res, 200, true, { combos });
    } catch (err) {
      return handleError(res, 500, err);
    }
  },

  createCombo: async (req, res) => {
    try {
      const auxCombo = await Combos.create(req.body);
      return handleResponse(res, 201, true, { combo: auxCombo });
    } catch (err) {
      return handleError(res, 500, err);
    }
  },
  updateCombo: async (req, res) => {
    try {
      // Verifica si el combo existe antes de intentar actualizarlo
      const existingCombo = await Combos.findOne({ _id: req.params.id });

      if (!existingCombo) {
        return handleResponse(res, 404, true, {
          message: "Combo no encontrado",
        });
      }

      // Realiza la actualización del combo
      const updatedCombo = await Combos.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Esta opción determina si la función debe devolver el documento original antes de la actualizacion "false", o el documente actualziado
      );

      return handleResponse(res, 200, true, { combo: updatedCombo });
    } catch (err) {
      return handleError(res, 500, err);
    }
  },
  deleteCombo: async (req, res) => {
    try {
      const deletedCombo = await Combos.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!deletedCombo) {
        return handleResponse(res, 404, true, { message: "Combo not found" });
      }
      return handleResponse(res, 200, true, { message: "Combo deleted" });
    } catch (err) {
      return handleError(res, 500, err);
    }
  },
};

module.exports = combosController;
