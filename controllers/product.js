const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

const getProductByCategory = async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      images,
      category,
      discount,
      availableQuantity,
      tags,
    } = req.body;

    // تحقق من الحقول المطلوبة
    if (!title || !description || !price || !category || !availableQuantity) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const product = await Product.create({
      title,
      description,
      price,
      thumbnail,
      images,
      category,
      discount,
      availableQuantity,
      tags,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ message: "Product deleted successfully" });
};
module.exports = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  deleteProduct,
};
