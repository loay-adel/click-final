const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//  Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const request = { ...req.body };

    if (request.password) {
      request.password = await bcrypt.hash(request.password, 10);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, request, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
const updateUserPatrtially = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserPatrtially,
  deleteUserById,
};
