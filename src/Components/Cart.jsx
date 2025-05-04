import React, { useState } from "react";

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Tomatoes", price: 20, quantity: 2 },
    { id: 2, name: "Rice", price: 50, quantity: 1 },
  ]);

  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🛒 Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center py-4 border-b">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:underline">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
