import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQty = (productId, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, qty: Math.max(qty, 1) } : item
      )
    );
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQty,
    totalPrice,
  };
};

export default useCart;
