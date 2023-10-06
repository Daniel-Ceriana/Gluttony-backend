const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: false },
  categorie: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  imgUrl: { type: String, required: false },
  stock: { type: Number, required: true },
  hasDiscount: { type: Number, required: false, default: 0 },
  bestSeller: { type: String, required: false },
});

const data =[
  {
    name: "Queso cremoso Doble Crema 1kg",
    brand: "La paulina",
    categorie: "quesos",
    price: 2839,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00011100/00011102.jpg?3.0.160d",
    stock: 10,
  },
  {
    name: "Queso Barra Tybo 1kg",
    brand: "La paulina",
    categorie: "quesos",
    price: 3389,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00045200/00045263.jpg?3.0.160d",
    stock: 11,
  },
  {
    name: "Queso cremoso 500g",
    brand: "La Serenisima",
    categorie: "quesos",
    price: 3078,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00011100/00011102.jpg?3.0.160d",
    stock: 12,
  },
  {
    name: "Queso Muzzarella 1kg",
    brand: "Barraza",
    categorie: "quesos",
    price: 3745,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00011000/00011050.jpg?3.0.160d",
    stock: 13,
  },
  {
    name: "Queso Port Salut 450g",
    brand: "La Serenisima",
    categorie: "quesos",
    price: 3201,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00012900/00012915.jpg?3.0.160d",
    stock: 14,
  },
  {
    name: "Queso Pategras 1kg",
    brand: "La serenisima",
    categorie: "quesos",
    price: 4640.58,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00012900/00012927.jpg?3.0.160d",
    stock: 15,
  },
  {
    name: "Queso Danbo Barra 1kg",
    brand: "La Serenisima",
    categorie: "quesos",
    price: 4102.34,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00012900/00012935.jpg?3.0.160d",
    stock: 16,
  },
  {
    name: "Queso Pategras 1kg",
    brand: "La Paulina",
    categorie: "quesos",
    price: 4095,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00088400/00088440.jpg?3.0.160d",
    stock: 17,
  },
  {
    name: "Queso Muzzarella 1kg",
    brand: "La Paulina",
    categorie: "quesos",
    price: 2999,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00039500/00039557.jpg?3.0.160d",
    stock: 18,
  },
  {
    name: "Queso Parmesano 1kg",
    brand: "La Paulina",
    categorie: "quesos",
    price: 5429,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00023600/00023683.jpg?3.0.160d",
    stock: 19,
  },
  {
    name: "Jamon Cocido",
    brand: "Lario",
    categorie: "fiambres",
    price: 3659,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00013300/00013380.jpg?3.0.160d",
    stock: 20,
  },
  {
    name: "Salame Milan 1kg",
    brand: "El familiar",
    categorie: "fiambres",
    price: 5510,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00034900/00034909.jpg?3.0.160d",
    stock: 21,
  },
  {
    name: "Salame Crespon 1kg",
    brand: "Ebro",
    categorie: "fiambres",
    price: 7205,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00045100/00045182.jpg?3.0.160d",
    stock: 22,
  },
  {
    name: "Salamin F/G 1Kg",
    brand: "Ebro",
    categorie: "fiambres",
    price: 5489,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00017000/00017008.jpg?3.0.160d",
    stock: 23,
  },
  {
    name: "Jamon Cocido",
    brand: "Cagnoli",
    categorie: "fiambres",
    price: 1357,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00563900/00563919.jpg?3.0.160d",
    stock: 24,
  },
  {
    name: "Mortadela Mini Tandilera 300gr",
    brand: "Cagnoli",
    categorie: "fiambres",
    price: 893,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00488900/00488907.jpg?3.0.160d",
    stock: 25,
  },
  {
    name: "Salame Milan",
    brand: "Ebro",
    categorie: "fiambres",
    price: 4695,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00034900/00034910.jpg?3.0.160d",
    stock: 26,
  },
  {
    name: "Longaniza española",
    brand: "Ebro",
    categorie: "fiambres",
    price: 5489,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00000100/00000197.jpg?3.0.160d",
    stock: 27,
  },
  {
    name: "Salamin picado grueso 1kg",
    brand: "Las Dinas",
    categorie: "fiambres",
    price: 5449,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00016100/00016105.jpg?3.0.160d",
    stock: 28,
  },
  {
    name: "Jamon Cocido Feteado 1kg",
    brand: "Primera Marca",
    categorie: "fiambres",
    price: 4795,
    imgUrl:
      "https://static.cotodigital3.com.ar/sitios/fotos/full/00015200/00015241.jpg?3.0.160d",
    stock: 29,
  },
];
const Products = mongoose.model("product", productSchema);

module.exports = Products;
