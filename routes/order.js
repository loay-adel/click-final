const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { checkout } = require("../controllers/order");
const router = express.Router();

router.post("/checkout-cash/:userId", verifyToken, checkout);

module.exports = router;
