// SuggestedAccessories.jsx

import React from 'react';
import { Link } from "react-router-dom"; 

// Define which categories should be considered "Accessories"
const ACCESSORY_CATEGORIES = [
    'accessories', // General accessories category
    'audio',       // Headphones, earbuds
    'power',       // Chargers, cables
    'wearables',   // Smartwatches
    'protection',  // Cases, covers
];

const SuggestedAccessories = ({ allProducts, product }) => {
    if (!allProducts || !product) {
        return null;
    }

    // 1. Filter allProducts to find accessory items
    // This filter is intentionally broad: it shows accessories regardless of the main product's category,
    // which works well for general cross-selling.
    const suggested = allProducts
        .filter(p => ACCESSORY_CATEGORIES.includes(p.category.toLowerCase()))
        .slice(0, 4); // Show a maximum of 4 accessories

    if (suggested.length === 0) {
        return null;
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Add Essential Accessories</h2>
            <div className="flex overflow-x-auto space-x-4 md:grid md:grid-cols-4 md:space-x-0 md:gap-4">
                
                {suggested.map((item) => (
                    <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="flex-shrink-0 w-40 md:w-auto bg-white p-3 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <img 
                            src={item.img || `https://placehold.co/100x80/000000/ffffff?text=${item.name}`} 
                            alt={item.name} 
                            className="w-full h-24 object-contain mb-2 rounded" 
                            onError={(e) => (e.target.src = `https://placehold.co/100x80/cccccc/333?text=${item.name}`)}
                        />
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-green-600 font-bold">₹{item.price.toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuggestedAccessories;