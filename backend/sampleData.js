const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Sample products array
const sampleProducts = [
  {
    title: 'iPhone 14 Pro',
    price: 1299,
    image: 'https://via.placeholder.com/150',
    description: 'Latest Apple iPhone with A16 Bionic chip and advanced camera system.'
  },
  {
    title: 'MacBook Air M2',
    price: 999,
    image: 'https://via.placeholder.com/150',
    description: 'Lightweight and powerful laptop with Apple M2 chip.'
  },
  {
    title: 'Sony WH-1000XM5',
    price: 399,
    image: 'https://via.placeholder.com/150',
    description: 'Industry-leading noise cancelling over-ear headphones.'
  },
  {
    title: 'Samsung Galaxy S23 Ultra',
    price: 1199,
    image: 'https://via.placeholder.com/150',
    description: 'Samsung flagship phone with 200MP camera and great performance.'
  },
  {
    title: 'Apple Watch Series 8',
    price: 499,
    image: 'https://via.placeholder.com/150',
    description: 'Fitness tracker with temperature sensing, crash detection, and more.'
  }
];

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('🔗 Connected to MongoDB...');
  await Product.deleteMany();
  await Product.insertMany(sampleProducts);
  console.log('✅ Sample products inserted successfully!');
  process.exit();
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});
