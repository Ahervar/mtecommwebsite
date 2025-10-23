import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Import the new custom hook
import { useCart } from '../context/useCart';
// 2. Import the utility function for calculating item price for display
import { getItemTotal } from '../utils/cartUtils'; 

export default function CartPage() {
  // 3. Use the custom hook and destructure the new properties/functions
  const { cartItems, cartTotal, addItem, removeItem, clearItem } = useCart();
  const navigate = useNavigate();

  // The total price is now pre-calculated in the context as 'cartTotal'
  // We use a variable for readability, though it's technically the total discounted price
  const totalDiscountedPrice = cartTotal;

  // Function to handle the increment/decrement buttons
  const handleUpdateQuantity = (item, action) => {
    if (action === 'increment') {
      // addItem always adds 1 to the existing item's quantity
      addItem(item); 
    } else if (action === 'decrement') {
      // removeItem decreases the quantity by 1, or removes the item if quantity is 1
      removeItem(item.id); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty. Time to find some deals! 🛒</p>
            <Link 
              to="/" 
              className="inline-block bg-[#2874F0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1f5fcc] transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition duration-150"
                >
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-24 h-24 object-contain rounded-md border p-1 flex-shrink-0" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg truncate">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.desc.substring(0, 50)}...</div>
                    <div className="text-base font-semibold text-[#0b8043] mt-1">
                      {/* Use getItemTotal to calculate the total price for this row item */}
                      ₹{Math.round(getItemTotal(item)).toLocaleString()} 
                      <span className="text-xs text-gray-400 font-normal ml-2">
                        ({item.quantity} x ₹{Math.round(item.price * (1 - (item.discount || 0) / 100)).toLocaleString()})
                      </span>
                    </div>
                  </div>
                  
                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => handleUpdateQuantity(item, 'decrement')} 
                        className="w-8 h-8 flex items-center justify-center text-xl font-semibold text-gray-600 hover:bg-gray-100 transition"
                      >
                        -
                      </button>
                      <div className="w-8 h-8 flex items-center justify-center border-l border-r text-md font-medium">
                        {/* 4. Use 'quantity' instead of 'qty' */}
                        {item.quantity} 
                      </div>
                      <button 
                        onClick={() => handleUpdateQuantity(item, 'increment')} 
                        className="w-8 h-8 flex items-center justify-center text-xl font-semibold text-gray-600 hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Clear Item button */}
                    <button 
                      onClick={() => clearItem(item.id)} 
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <aside className="p-6 bg-gray-50 border rounded-xl shadow-inner h-fit">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Price Details</h2>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
                {/* Note: In a real app, you'd calculate original total and discount separately */}
                <div className="flex justify-between border-t pt-3 font-bold text-xl text-[#0b8043]">
                  <span>Total Payable</span>
                  <span>₹{Math.round(totalDiscountedPrice).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-[#FFC72C] text-black py-3 rounded-lg font-bold text-lg hover:bg-[#ffb800] transition shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}