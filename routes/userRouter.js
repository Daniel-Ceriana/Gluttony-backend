const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.getUserByEmail);
userRouter.put("/:id", userController.updateUser);
// -----------------------token

module.exports = userRouter;
