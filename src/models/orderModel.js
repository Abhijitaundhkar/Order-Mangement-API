const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    products: [
      {
        productId: {
          _id: false,
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0, // Will be calculated before saving
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

// // Middleware: Calculate `totalAmount` before saving the order
// orderSchema.pre("save", async function (next) {
//     try {
//       const Product = mongoose.model("Product");

//       let total = 0;
//       for (const item of this.products) {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           throw new Error(`Product with ID ${item.productId} not found`);
//         }
//         total += product.price * item.quantity;
//       }

//       this.totalAmount = total;
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
