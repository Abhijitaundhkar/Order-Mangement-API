const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided. Please login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Invalid token. Please login again." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("protectRoute error:", error);
    res
      .status(401)
      .json({ error: "Invalid or expired token. Please login again." });
  }
};

// Authorize Admin
const authorizeAdmin = (req, res, next) => {
  console.log(req.user);
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

module.exports = { protect, authorizeAdmin };
