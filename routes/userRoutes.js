const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/users");
const { register , login } = require("../controllers/auth");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.route("/register").post(register)
router.route("/login").post(login)
module.exports = router;
