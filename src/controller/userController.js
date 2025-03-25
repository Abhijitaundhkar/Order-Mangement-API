const User = require("../models/userModel");
const generateToken = require("../config/jwtConfig");
const {
  hashPassword,
  comparePassword,
} = require("../middleware/passwordMiddleware");
const createUser = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({
        message: "User already present",
      });
    }
    password = await hashPassword(password);
    const user = await User.create({ username, email, password, role });
    if (user) {
      // user = await User.findById(req.user.id).select("-password");
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      const token = generateToken(user._id, res);
      res.json({ message: "Login successful", token: token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { createUser, getUser, login };
