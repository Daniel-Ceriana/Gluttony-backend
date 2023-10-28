const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.post("/auth/signUp", userController.signUp);
userRouter.get("/auth/signIn", userController.signIn);
// userRouter.put("/:id", userController.updateUser);
// -----------------------token

module.exports = userRouter;
