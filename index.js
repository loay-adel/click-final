require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DB = process.env.DB;
const PORT = process.env.PORT || 6000; // Keep original port
const app = express();

// Route files
const users_routes = require("./routes/userRoutes");
const products_routes = require("./routes/products");
const order_routes = require("./routes/order");
// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("MongoDB Connected");
    console.log(`Connected to DB: ${mongoose.connection.db.databaseName}`);
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

const corsOptions = {
  origin: ["http://localhost:3000", "https://gioco-rx7d.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Connect to DB first
connectDB();

// Mount routers
app.use("/api/users", users_routes);
app.use("/api/products", products_routes);
app.use("/api/orders", order_routes);
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
