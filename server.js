require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");

app.use(express.json());
app.use(cors());

const productsRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");

app.get("/", (req, res) => res.send("home"));
app.use("/api", productsRouter);
app.use("/user", userRouter);
// cambiar ruta, en principio los datos de la api pasan por /api

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);
