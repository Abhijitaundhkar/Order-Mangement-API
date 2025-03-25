const express = require("express");
const { protect, authorizeAdmin } = require("../middleware/authMiddleware");
const { createUser, login, getUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/profile", protect, getUser);

module.exports = router;
