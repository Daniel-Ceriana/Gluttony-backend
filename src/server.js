// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("./config/db");

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const productsRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");
const combosRouter = require("./routes/combosRouter");

app.get("/", (req, res) => res.send("home"));
app.use("/api", productsRouter);
app.use("/api", combosRouter);
app.use("/api", userRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);
