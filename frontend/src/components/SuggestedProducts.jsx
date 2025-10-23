import React from 'react';
import { Link } from "react-router-dom"; 

/**
 * SuggestedProducts component displays up to four products, prioritizing those
 * that share the same 'category' as the product currently being viewed.
 * * @param {Array} allProducts - The complete list of products available.
 * @param {object} currentProduct - The full product object of the product currently being displayed.
 */
const SuggestedProducts = ({ allProducts, currentProduct }) => {
  // Guard clause: ensure we have data to work with
  if (!Array.isArray(allProducts) || !currentProduct || !currentProduct.category) {
    return null;
  }
  
  const currentProductId = currentProduct.id;
  const currentCategory = currentProduct.category;
  const MAX_SUGGESTIONS = 4;

  // 1. Separate products into "Same Category" and "Other Categories"
  let sameCategoryProducts = [];
  let otherProducts = [];

  allProducts.forEach(p => {
    // Exclude the current product itself
    if (String(p.id) === String(currentProductId)) {
      return; 
    }

    if (p.category === currentCategory) {
      sameCategoryProducts.push(p);
    } else {
      otherProducts.push(p);
    }
  });

  // 2. Prioritize same-category products (up to MAX_SUGGESTIONS)
  let suggestions = sameCategoryProducts.slice(0, MAX_SUGGESTIONS);

  // 3. If we don't have enough, fill the rest from other categories
  const neededCount = MAX_SUGGESTIONS - suggestions.length;
  if (neededCount > 0) {
    // Add the needed number of products from the 'otherProducts' list
    suggestions = suggestions.concat(otherProducts.slice(0, neededCount));
  }
  
  // Final check if any suggestions were found
  if (suggestions.length === 0) {
    return null; 
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 border-t border-gray-200 mt-8 rounded-xl">
      {/* Dynamic title based on suggestions found */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {sameCategoryProducts.length > 0 ? `More ${currentCategory} Products` : 'You Might Also Like'}
      </h2>

      {/* Horizontal scroll for mobile, grid for desktop (Flipkart style) */}
      <div className="flex overflow-x-auto space-x-4 pb-2 md:grid md:grid-cols-4 md:space-x-0 md:gap-4">
        {suggestions.map((item) => (
          // Link navigates to the detail page of the suggested product
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            // Responsive styling for card layout
            className="flex-shrink-0 w-40 md:w-auto bg-white p-3 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02] duration-200"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-24 object-contain mb-2 rounded"
              // Placeholder for missing images
              onError={(e) => (e.target.src = 'https://placehold.co/100x80/cccccc/333?text=Product')}
            />
            <p className="text-sm font-semibold truncate text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500 truncate">{item.category}</p>
            <p className="text-sm text-green-600 font-bold mt-1">
              ₹{(Math.round(item.price * (1 - (item.discount || 0) / 100)) || 'Price N/A').toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;