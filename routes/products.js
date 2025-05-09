const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/category/:category', getProductByCategory);
router.get('/:id', getProductById);
router.post('/',createProduct);
module.exports = router;

