const mongoose = require("mongoose");

// Schema for Address
const addressSchema = new mongoose.Schema({
  street: { type: String, default: "", trim: true },
  city: { type: String, default: "", trim: true },
  state: { type: String, default: "", trim: true },
  zip: { type: String, default: "", trim: true },
  country: { type: String, default: "", trim: true },
  isDefault: { type: Boolean, default: false },
});

// Schema for Cart Item
const cartItemSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  image: { type: String, default: "" },
  price: { type: Number, min: 0 },
  discountPercentage: { type: Number, min: 0, max: 100 },
  rating: { type: Number, min: 0, max: 5 },
  availableQuantity: { type: Number, min: 0 },
  thumbnail: { type: String, default: "" },
  images: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  quantity: { type: Number, default: 1, min: 1 },
  subtotal: { type: Number, min: 0 },
});

// Schema for User
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "", trim: true },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    addresses: { type: [addressSchema], default: [] },
    wishlist: { type: [String], default: [] },
    cart: { type: [cartItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
