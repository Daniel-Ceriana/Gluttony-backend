const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const sendMail = require("../services/sendMail.js");
//

const userController = {
    verifyUserAccount: async(req, res) => {
        // falta redireccionar
        try {
            const updatedUser = await User.findOneAndUpdate({ uniqueString: req.params.string }, { emailVerification: true }, { new: true });
            updatedUser.emailVerification;
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
                message: "Error: no user found",
            });
        }
    },

    signIn: async(req, res) => {
        if (!req.body.userData) {
            return res.json({
                success: false,
                from: from,
                message: "Error: no data found",
            });
        }

        const { email, password, from } = req.body.userData;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.json({
                    success: false,
                    from: from,
                    //can't tell the user if the email is incorrect, its not safe security
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
                from: from,
            };

            if (isPasswordCorrect.length > 0) {
                if (from !== "signUp-form") {
                    const hashPassword = bcryptjs.hashSync(password, 10);
                    user.from.push(from);
                    user.password.push(hashPassword);

                    await user.save();

                    res.json({
                        success: true,
                        from,
                        response: { dataUser },
                        message: from + " added to your signing in methods",
                    });
                } else {
                    res.json({
                        success: true,
                        from,
                        response: { dataUser },
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
    signUp: async(req, res) => {
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
                        message: "User created and added, check your email to verify account ",
                    });
                    // 9:54
                } else {
                    // if it's coming from social network
                    // create new user with no need of verification
                    // const socialNetworks = ["google","facebook"]...;
                    // for(){if(socialNetworks[i]){
                    // crear usuario ya verificado
                    // }}
                    newUser.emailVerification = true;
                    await newUser.save();

                    res.json({
                        success: true,
                        from: from,
                        message: "User created and added " + from + " to your sign in methods",
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
    updateUser: async(req, res) => {
        try {
            // sacar el id desde el token
            const user = await User.findOneAndUpdate({ _id: req.params.id },
                req.body, { new: true }
            );
            return res.status(200).json({ success: true, user: user });
        } catch (err) {
            return res.status(500).json({ success: false, error: err });
        }
    },
};

module.exports = userController;