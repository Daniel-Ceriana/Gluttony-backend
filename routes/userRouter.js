const express = require("express");
const userRouter = express.Router();
const { signUpValidator, signInValidator } = require("../config/validator");

const userController = require("../controllers/userController");

userRouter.post("/auth/signUp", signUpValidator, userController.signUp);
userRouter.get("/auth/signIn", signInValidator, userController.signIn);
userRouter.get("/auth/verifyEmail/:string", userController.verifyUserAccount);
// userRouter.put("/:id", userController.updateUser);
// -----------------------token

module.exports = userRouter;