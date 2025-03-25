const express = require("express");
const { protect, authorizeAdmin } = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  getProductsById,
  getProductsAll,
} = require("../controller/productController");

const router = express.Router();

router.post("/", protect, authorizeAdmin, createProduct);
router.put("/:id", protect, authorizeAdmin, updateProduct);
router.get("/all", protect, getProductsAll);
router.get("/:id", protect, getProductsById);

module.exports = router;
