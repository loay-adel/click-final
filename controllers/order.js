const User = require("../models/User");
const Order = require("../models/order");
exports.checkout = async (req, res) => {
  const { items } = req.body;
  const { userId } = req.params;

  if (req.user._id !== userId) {
    return res
      .status(403)
      .json({ message: "Not allowed to create order for this user" });
  }
  const user = await User.findById(userId);

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in the order" });
  }

  const itemsPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  let shippingPrice = 0;
  if (itemsPrice < 100) {
    shippingPrice = 20;
  }

  const totalPrice = itemsPrice + shippingPrice;

  const newOrder = await Order.create({
    user,
    items,
    shippingAddress: user.addresses,
    paymentMethod: "cash",
    shippingPrice,
    totalPrice,
    isPaid: true,
    paidAt: new Date(),
  });

  res.status(201).json({
    message: "Cash order created",
    order: newOrder,
  });
};
