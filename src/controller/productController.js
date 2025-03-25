const Product = require("../models/productModel");

// Create Product (Only Admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Using `.create()` for a cleaner approach
    const product = await Product.create({ name, description, price, stock });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Update Product (Only Admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List Products (Public)
const getProductsAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product by ID (Public)
const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProductsById,
  getProductsAll,
};
