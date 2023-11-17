const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const sendMail = require("../services/sendMail.js");
//
const jwt = require("jsonwebtoken");

const userController = {
  verifyUserAccount: async (req, res) => {
    try {
      //   const updatedUser =
      await User.findOneAndUpdate(
        { uniqueString: req.params.string },
        { emailVerification: true }
      );
      // , { new: true }
      // updatedUser.emailVerification;
      return res.redirect("http://localhost:3000/login");
      // .json({
      //     success: true,
      //     from: "user verification",
      //     message: "Email verification complete!",
      // })
    } catch (error) {
      return res.json({
        success: false,
        from: "user verification",
        message: "Error: user not found",
      });
    }
  },

  signIn: async (req, res) => {
    if (!req.body.userData) {
      return res.json({
        success: false,
        from: "controller",
        message: "Error: no data found",
      });
    }
    console.log(req.body);
    const { email, password, from } = req.body.userData;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          success: false,
          from: from,
          message: "User or password incorrect.",
        });
      }

      const isPasswordCorrect = user.password.filter((pass) =>
        bcryptjs.compareSync(password, pass)
      );
      console.log(isPasswordCorrect);
      console.log(bcryptjs.compareSync(password, user.password[0]));
      const dataUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        cart: user.cart,
        from: from,
        aplication: user.aplication,
      };

      if (isPasswordCorrect.length > 0) {
        const aux = user.from.filter((from) => from == "google");
        if (from !== "signUp-form" && aux.length == 0) {
          const hashPassword = bcryptjs.hashSync(password, 10);
          user.from.push(from);
          user.password.push(hashPassword);

          await user.save();
          const token = jwt.sign(dataUser, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          res.json({
            // agregar email verification true
            success: true,
            from,
            response: { token, dataUser },
            message: from + " added to your signing in methods",
          });
        } else {
          // si algo se rompe, poner {...dataUser}
          const token = jwt.sign(dataUser, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          res.json({
            success: true,
            from,
            response: { token, dataUser },
            message: "Welcome back, " + dataUser.fullName,
          });
        }
      } else {
        res.json({
          success: false,
          from,
          message: "User or password incorrect",
        });
      }
    } catch (err) {
      res.json({
        success: false,
        from: from,
        message: "Ups, something went wrong, please try again in a few minutes",
        response: err,
      });
    }
  },
  signUp: async (req, res) => {
    const uniqueString = crypto.randomBytes(15).toString("hex");

    // before checking data values, checks if userData exists
    if (!req.body.userData) {
      return res.json({
        success: false,
        from: from,
        message: "Error: no data found",
      });
    }

    const { fullName, dni, email, password, from, aplication } =
      req.body.userData;
    const hashPassword = bcryptjs.hashSync(password, 10);
    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        if (userExist.from.indexOf(from) !== -1) {
          res.json({
            success: false,
            from: from,
            message: "You already have an account, please, sign in instead.",
          });
        } else {
          userExist.from.push(from);
          userExist.password.push(hashPassword);

          await userExist.save();

          res.json({
            success: true,
            from: from,
            message: from + " was added to your sign in methods.",
          });
        }
      } else {
        const newUser = new User({
          fullName,
          dni,
          email,
          password: [hashPassword],
          from: from,
          aplication: aplication,
          uniqueString: uniqueString,
          emailVerification: false,
        });
        if (from === "signUp-form") {
          sendMail(email, uniqueString);
          await newUser.save();
          res.json({
            success: true,
            from: from,
            message:
              "User created and added, check your email to verify account ",
          });
          // 9:54
        } else {
          // if it's coming from social network
          // create new user with no need of verification
          // const socialNetworks = ["google","facebook"]...;
          // for(){if(socialNetworks[i]){
          // crear usuario ya verificado
          //   [google]
          // }}
          newUser.emailVerification = true;
          await newUser.save();

          res.json({
            success: true,
            from: from,
            message:
              "User created and added " + from + " to your sign in methods",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        from: "controller",
        message: "something's gone wrong, try again in a few minutes",
      });
    }
  },
  verifyToken: async (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        from: null,
        response: {
          id: req.user._id,
          email: req.user.email,
          fullName: req.user.fullName,
        },
        message: "Welcome back, " + req.user.fullName,
      });
    } else {
      res.json({
        success: false,
        message: "Please sign in again",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      // sacar el id desde el token
      // actualizar token
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      return res.json({
        success: true,
        from: from,
        response: {
          dataUser: {
            email: user.email,
            fullName: user.fullName,
            cart: user.cart,
          },
        },
        message: "User created and added " + from + " to your sign in methods",
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "Something went wrong, try again later",
      });
    }
  },
};

module.exports = userController;
