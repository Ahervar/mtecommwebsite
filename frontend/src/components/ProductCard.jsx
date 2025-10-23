import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';


export default function ProductCard({ product }) {
  // 2. Use the custom hook 
  const { addItem } = useCart();


  const finalPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));

  // Placeholder image with robust fallbacks
  const placeholderImg = `https://placehold.co/300x200/2874F0/ffffff?text=MT`;

  // Note: Re-implemented handler functions as they are required for the buttons below to prevent link navigation.
  const handleItemAction = (e, navigateToCart = false) => {
      e.preventDefault(); // Prevent navigating to the product detail page when clicking the button
      e.stopPropagation(); // Stop event from bubbling up to the Link
      addItem(product);
      
      // Removed console logs to keep it clean, replaced with basic function name
      // In your real code, this would handle navigation/checkout logic
  };

  const handleAddToCart = (e) => handleItemAction(e, false);
  // Removed handleBuyNow handler


  return (
      <Link
          to={`/product/${product.id || 'mock-id'}`}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden block group"
      >
          {/* ADJUSTED: Image height set to h-32 on mobile, h-48 on sm (tablet/pc) and up */}
          <div className="p-4 flex items-center justify-center h-32 sm:h-48 bg-gray-50">
              <img
                  src={product.img || placeholderImg}
                  alt={product.name || 'Product'}
                  className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg; }}
              />
          </div>

          {/* ADJUSTED: Padding set to p-3 on mobile, p-4 on sm (tablet/pc) and up */}
          <div className="p-3 sm:p-4 border-t border-gray-100">
              
              {/* Brand: Tighter margin (mt-0.5) on mobile, slightly larger on desktop */}
              <p className="text-xs sm:text-sm text-[#2874F0] font-medium uppercase truncate leading-none sm:mt-0.5">
                {product.brand || 'BRAND'}
              </p>
              
              {/* Title: Tighter margin (mt-0.5) on mobile, slightly larger on desktop */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5 truncate leading-tight sm:mt-1">
                {product.name || 'Mock Product Name'}
              </h3>

              {/* Description: Tighter margins on mobile, slightly larger on desktop */}
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 mb-1 line-clamp-2 sm:mb-2">
                {product.desc || '8GB RAM, 128GB Storage, 6.7" Display'}
              </p>

              {/* Pricing: Tighter top margin on mobile, slightly larger on desktop */}
              <div className="flex flex-wrap items-center gap-1 mt-1 sm:mt-2">
                  {/* Price scales down on mobile (text-sm) */}
                  <span className="text-sm sm:text-base font-bold text-[#0b8043] whitespace-nowrap">
                      ₹{finalPrice.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                      <>
                          <span className="text-xs text-gray-400 line-through whitespace-nowrap">
                              ₹{product.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium text-red-500 whitespace-nowrap">
                              ({product.discount}% OFF)
                          </span>
                      </>
                  )}
              </div>


              {/* Simplified container for single button */}
              <div className="mt-2 sm:mt-4"> {/* Reduced top margin before button on mobile, restored on desktop */}

                  {/* Add to Cart Button (ADJUSTED: smaller py-1.5 padding on mobile, py-2 on desktop) */}
                  <button
                      className="w-full bg-[#FF9800] text-white font-semibold py-1.5 sm:py-2 rounded-lg hover:bg-[#ff8f00] transition duration-200 shadow-md flex items-center justify-center gap-2 text-sm"
                      onClick={handleAddToCart} 
                  >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      >
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Add to Cart
                  </button>
          
                </div>
            </div>
        </Link>
    );
}