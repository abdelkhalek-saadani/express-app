const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");

exports.signup = async (req, res, next) => {
  console.log("signup reached ! ");
  try {
    const user = await userService.createUser(req.body.email, req.body.password);
    const token = userService.createToken({ userId:user._id});

    res.status(201).json({
      message: "User added successfully!",
      userId: user._id,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const {user, token} = await userService.authUser(req.body.email, req.body.password);
    res.status(200).json({
      userId: user._id,
      token: token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
