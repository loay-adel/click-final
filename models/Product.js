const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  discount: Number,
  rating: Number,
  availableQuantity: Number,
  tags: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
