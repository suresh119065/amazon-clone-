const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - List all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error: Unable to fetch products' });
  }
});

module.exports = router;
