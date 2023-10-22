require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");

app.use(express.json());
app.use(cors());

const productsRouter = require("./routes/productsRouter");
const combosRouter = require("./routes/combosRouter");

app.get("/", (req, res) => res.send("home"));
app.use("/api", productsRouter);
app.use("/api", combosRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);
