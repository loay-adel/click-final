const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
} = require("../controllers/product");

router.get("/", getAllProducts);
router.get("/category/:category", getProductByCategory);
router.get("/:id", getProductById);
router.post("/", verifyToken, createProduct);
router.delete("/:id", verifyToken, deleteProduct);
module.exports = router;
