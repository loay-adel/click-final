const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserPatrtially,
  deleteUserById,
} = require("../controllers/users");
const { register, login } = require("../controllers/auth");

const authorize = require("../middlewares/authorize.middleware");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/login", login);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUserPatrtially);
router.put("/:id", updateUser);
router.delete("/:id", verifyToken, authorize(["admin"]), deleteUserById);

module.exports = router;
