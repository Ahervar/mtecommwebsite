import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Import the new custom hook
import { useCart } from '../context/useCart'; 

export default function Checkout() {
    // 2. Use the custom hook and destructure the new properties/functions
    const { cartItems, cartTotal, clearAll } = useCart();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    // The total price is now pre-calculated in the context as 'cartTotal'
    const totalPayable = cartTotal;

    const handleCheckout = () => {
        // Validation check (basic)
        if (!name || !phone || !address) {
            alert('Please fill out all contact and address fields.');
            return;
        }

        // 3. Create payload using cartItems and the correct property name (quantity)
        const payload = { 
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                discount: item.discount,
                quantity: item.quantity, // <--- Corrected name
            })), 
            total: totalPayable, 
            customer: { name, phone, address } 
        };
        
        console.log("Simulating API call with payload:", payload);

        // 4. Simulate the API call instead of using axios
        new Promise((resolve) => {
            setTimeout(() => {
                // Simulate a successful response from the server
                resolve({ 
                    data: { orderId: Math.floor(Math.random() * 1000000) } 
                });
            }, 1000); // 1 second delay simulation
        }).then((res) => {
            if (res.data && res.data.orderId) {
                alert('🎉 Order placed successfully! ID: ' + res.data.orderId);
                
                // 5. Use the new clearAll function from context
                clearAll(); 
                
                // Navigate to home page
                navigate('/');
                
                // Note: window.location.reload() is generally discouraged in React,
                // but if necessary for full state reset, you can keep it.
                // For this example, we'll keep it simple without reload.
            }
        });
    };

    if (!cartItems || cartItems.length === 0) 
        return (
            <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto text-center py-10 text-lg">
                Your cart is empty. Please add items before checking out.
            </div>
        );

    return (
        <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Finalize Your Order</h1>
            
            <div className="grid gap-4">
                {/* Input Fields */}
                <input 
                    className="border p-3 rounded focus:ring-[#2874F0] focus:border-[#2874F0] outline-none transition" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                />
                <input 
                    className="border p-3 rounded focus:ring-[#2874F0] focus:border-[#2874F0] outline-none transition" 
                    placeholder="Phone Number" 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                />
                <textarea 
                    className="border p-3 rounded focus:ring-[#2874F0] focus:border-[#2874F0] outline-none transition resize-none" 
                    placeholder="Full Shipping Address" 
                    rows="4"
                    value={address} 
                    onChange={e => setAddress(e.target.value)} 
                />

                {/* Total and Buttons */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-t-2 border-dashed border-gray-300">
                    <div className="text-2xl font-extrabold text-[#0b8043] flex justify-between">
                        <span>Total Payable:</span>
                        <span>₹{Math.round(totalPayable).toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="mt-4 flex gap-4">
                    <button 
                        onClick={handleCheckout} 
                        className="flex-1 bg-[#FFC72C] text-black font-bold text-lg px-4 py-3 rounded-lg hover:bg-[#ffb800] transition shadow-md"
                    >
                        Place Order (Cash on Delivery)
                    </button>
                    <button 
                        onClick={() => navigate('/cart')} 
                        className="flex-1 border border-gray-300 text-gray-600 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        Back to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}