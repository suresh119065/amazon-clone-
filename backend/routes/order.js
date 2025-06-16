const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// POST /api/orders - Create order (Authenticated)
router.post('/', auth, async (req, res) => {
  const { products, total } = req.body;

  if (!products || products.length === 0 || !total) {
    return res.status(400).json({ message: 'Missing products or total amount' });
  }

  try {
    const order = new Order({
      userId: req.user.id,
      products,
      total
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error while placing order' });
  }
});

// (Optional) GET /api/orders - Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

module.exports = router;
