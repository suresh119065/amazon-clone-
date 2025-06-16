import React from 'react';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQty,
    totalPrice,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/login'); // Or go to payment if logged in
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center border rounded-lg p-4 shadow-sm bg-white">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500">₹ {item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => updateQty(item._id, item.qty - 1)}
                    >−</button>
                    <span className="px-4">{item.qty}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => updateQty(item._id, item.qty + 1)}
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold">₹ {item.price * item.qty}</p>
                  <button
                    className="mt-2 text-red-600 hover:underline text-sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div class
