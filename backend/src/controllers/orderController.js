// backend/controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { project, supplier, items, totalAmount } = req.body;
    const order = new Order({
      project,
      supplier,
      items,
      totalAmount,
      userId: req.user.userId,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    throw error;
  }
};

exports.getOrdersByProject = async (req, res) => {
  try {
    const orders = await Order.find({ project: req.params.projectId });
    res.json(orders);
  } catch (error) {
    throw error;
  }
};