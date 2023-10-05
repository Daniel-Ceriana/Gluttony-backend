const User = require("../models/userModel.js");

//

const userController = {
  //   getUserById: async (req, res) => {
  //     let user;
  //     const id = req.params.id;
  //     try {
  //       user = await User.findOne({ _id: id });
  //       return res.status(200).json({ success: true, user: user });
  //     } catch (err) {
  //       res.status(500).json({ success: false, error: err });
  //     }
  //     res.json({ user });
  //   },
  getUserByEmail: async (req, res) => {
    let user;
    const email = req.params.email;
    try {
      user = await User.findOne({ email: email });
      return res.status(200).json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  createUser: async (req, res) => {
    let auxUser;
    try {
      auxUser = await User.create(req.body);
      return res.status(201).json({ success: true, user: auxUser });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  updateUser: async (req, res) => {
    try {
      // sacar el id desde el token
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      return res.status(200).json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
};

module.exports = userController;
