require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");
app.use(express.json());

const productsRouter = require("./routes/productsRouter");

app.get("/", (req, res) => res.send("home"));
app.use("/api", productsRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);
