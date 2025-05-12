const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/users");
const { register, login } = require("../controllers/auth");

// routes/userRoutes.js

const authorize = require("../middlewares/authorize.middleware");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
// routes/userRoutes.js
router.delete("/:id", verifyToken, authorize(["admin"]), deleteUserById);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
