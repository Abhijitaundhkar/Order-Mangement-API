require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/utlis/errorHandler");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

// Handle 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});
// Apply the error-handling middleware at the end
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
