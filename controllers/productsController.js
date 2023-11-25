const Product = require("../models/productModel");
const { validateAutorization } = require("../services/checkRole");
const { handleResponse, handleError } = require("./helpers/responseHelpers");

const productsController = {
  // Obtener un producto por su ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });

      if (!product) {
        return handleResponse(res, 404, false, {
          product: [],
          message: "Producto no encontrado",
        });
      }

      return handleResponse(res, 200, true, { product });
    } catch (err) {
      return handleError(res, 500, err);
    }
  },

  // Obtener productos con opciones de filtro (por categoría, ID o nombre)
  getProducts: async (req, res) => {
    try {
      const query = {};

      if (req.query.category) {
        query.category = req.query.category;
      }
      if (req.query._id) {
        query._id = req.query._id;
      }
      if (req.query.name) {
        const auxQuery = req.query.name.replace("_", " ");
        query.name = { $in: new RegExp("^" + auxQuery) };
      }

      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 5,
      };

      const result = await Product.paginate(query, options);

      if (result.docs.length === 0) {
        return handleResponse(res, 404, false, {
          products: [],
          message: "No se encontraron productos",
        });
      }
      console.log(result);
      const response = {
        success: true,
        page: {
          products: result.docs,
          totalProducts: result.total,
          productsPerPage: result.limit,
          actualPage: result.page,
          totalPages: result.totalPages,
        },
      };

      return handleResponse(res, 200, true, response);
    } catch (err) {
      return handleError(res, 500, err);
    }
  },

  // Crear un nuevo producto
  createProduct: async (req, res) => {
    try {
      if (validateAutorization.create(req.user.role)) {
        const auxProduct = await Product.create(req.body);
        return handleResponse(res, 201, true, { product: auxProduct });
      } else {
        return handleError(res, 500, { message: "Unauthorized" });
      }
    } catch (err) {
      return handleError(res, 500, err);
    }
  },

  // Actualizar un producto por su ID
  updateProduct: async (req, res) => {
    try {
      if (validateAutorization.edit(req.user.role)) {
        const product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        if (!product) {
          console.log("ERROR");
          return handleResponse(res, 404, false, {
            product: [],
            message: "Producto no encontrado",
          });
        }

        return handleResponse(res, 200, true, { product });
      } else {
        console.log("SIN AUTORIZACION");

        return handleError(res, 500, { message: "Unauthorized" });
      }
    } catch (err) {
      return handleError(res, 500, err);
    }
  },

  // Eliminar un producto por su ID
  deleteProduct: async (req, res) => {
    try {
      if (validateAutorization.delete(req.user.role)) {
        const deletedProduct = await Product.findByIdAndDelete({
          _id: req.params.id,
        });

        if (!deletedProduct) {
          return handleResponse(res, 404, false, {
            product: [],
            message: "Producto no encontrado",
          });
        }

        return handleResponse(res, 200, true, {
          message: "Producto eliminado",
        });
      } else {
        return handleError(res, 500, { message: "Unauthorized" });
      }
    } catch (err) {
      return handleError(res, 500, err);
    }
  },
};

module.exports = productsController;
