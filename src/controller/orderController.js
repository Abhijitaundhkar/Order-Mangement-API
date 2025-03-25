const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Create Order (POST /orders) - Customers place orders
const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    let totalAmount = 0;
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
      updatedProducts.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }
    console.log(updatedProducts);
    const order = new Order({
      userId: req.user._id,
      products: updatedProducts,
      totalAmount: totalAmount,
    });

    await order.save();
    console.log("order", order);
    res
      .status(201)
      .json({ message: `Order placed successfully ${order.status}`, order });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating order", details: error.message });
  }
};

// Update Order Status (PUT /orders/:id/status) - Admin Only
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    res.json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating order status", details: error.message });
  }
};

// Get Orders (GET /orders) - Customers see their orders, Admin sees all orders
const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find().populate("userId", "email username");
    } else {
      orders = await Order.find({ userId: req.user._id });
    }

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching orders", details: error.message });
  }
};

module.exports = { createOrder, updateOrderStatus, getOrders };
