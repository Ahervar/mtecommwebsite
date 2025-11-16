import React from 'react';
import { Link } from "react-router-dom"; 

/**
 * SuggestedProducts component displays up to four products, prioritizing those
 * that share the same 'category' as the product currently being viewed.
 * @param {Array} allProducts - The complete list of products available.
 * @param {object} product - The full product object of the product currently being displayed.
 */
// 💡 FIX: Destructure the props that are passed down from the parent component
const SuggestedProducts = ({ allProducts, product }) => {
    
    // Safety check: ensure both props exist before attempting to filter
    if (!allProducts || !product) {
        // If data is missing, return null to prevent an error
        return null; 
    }

    // 1. Filter allProducts to find related items
    const suggested = allProducts
      .filter(p => 
        // 🛑 FIX: Use the 'product' prop received in the function arguments
        p.category === product.category && // Must be in the same category
        p.id !== product.id                  // Must not be the product we are currently viewing
      )
      .slice(0, 4); // Show a maximum of 4 suggestions
    
    // 2. If no related products are found, don't render anything
    if (suggested.length === 0) {
      return null;
    }
    
    // 3. Render the list of suggested products
    return (
      <div className="p-4 md:p-8 bg-gray-50 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
        <div className="flex overflow-x-auto space-x-4 md:grid md:grid-cols-4 md:space-x-0 md:gap-4">
          
          {/* Map over the real 'suggested' products array */}
          {suggested.map((item) => (
            
            // 4. Wrap each card in a <Link> to its own product page
            <Link
              key={item.id}
              // 💡 Key insight: Clicking this link reloads the ProductDetailPage with the new product ID.
              to={`/product/${item.id}`} 
              className="flex-shrink-0 w-40 md:w-auto bg-white p-3 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition"
              // Optional: You might want to scroll to the top of the page when navigating
              onClick={() => window.scrollTo(0, 0)}
            >
              <img 
                // 5. Use the item's real image
                src={item.img || `https://placehold.co/100x80/2874F0/ffffff?text=${item.name}`} 
                alt={item.name} 
                className="w-full h-24 object-contain mb-2 rounded" 
                onError={(e) => (e.target.src = `https://placehold.co/100x80/cccccc/333?text=${item.name}`)}
              />
              {/* 6. Use the item's real name and price */}
              <p className="text-sm font-semibold truncate">{item.name}</p>
              <p className="text-xs text-green-600 font-bold">₹{item.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    );
};

export default SuggestedProducts;