const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
//

const userController = {
    signIn: async(req, res) => {
        const { email, password, from } = req.body.userData;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.json({
                    success: false,
                    from: from,
                    message: "Please sign up before signing in.",
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

            if (from !== "signUp-form") {
                if (isPasswordCorrect.length > 0) {
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
                        success: false,
                        from,
                        message: "User or password incorrect",
                    });
                }
            } else {
                if (isPasswordCorrect.length > 0) {
                    res.json({
                        success: true,
                        from,
                        response: { dataUser },
                        message: "Welcome back, " + dataUser.fullName,
                    });
                } else {
                    res.json({
                        success: false,
                        from,
                        message: "User or password incorrect",
                    });
                }
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
        // faltan validaciones
        const userDataNames = [
            "fullName",
            "dni",
            "email",
            "password",
            "from",
            "aplication",
        ];
        const emailVerify = false;
        const uniqueString = crypto.randomBytes(15).toString("hex");
        if (!req.body.userData) {
            return res.json({
                success: false,
                message: "Error: no data found",
            });
        }
        // checks if something's missing in req.body.userData
        for (let i = 0; i < userDataNames.length; i++) {
            if (!req.body.userData[userDataNames[i]]) {
                return res.json({
                    success: false,
                    message: "Error: no data (" + userDataNames[i] + ") found",
                });
            }
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
                    from: [from],
                    aplication,
                    uniqueString,
                    emailVerify,
                });

                await newUser.save();

                res.json({
                    success: true,
                    from: from,
                    message: "User created and added " + from + " to your sign in methods",
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
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