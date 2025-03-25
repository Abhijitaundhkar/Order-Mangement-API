const express = require("express");
const { protect, authorizeAdmin } = require("../middleware/authMiddleware");
const {
  createOrder,
  updateOrderStatus,
  getOrders,
} = require("../controller/orderController");

const router = express.Router();

router.post("/", protect, createOrder); // Customers place orders
router.put("/:id/status", protect, authorizeAdmin, updateOrderStatus); // Admin updates status
router.get("/", protect, getOrders); // Customers see their orders, Admin sees all

module.exports = router;
