import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SuggestedProducts from './SuggestedProducts';
import SuggestedAccessories from './SuggestedAccessories';
import { ShoppingCart, Zap, Package, Shield, Truck } from 'lucide-react';

// ProductDetailPage now accepts the 'product' object and 'addItem' function via props
const ProductDetailPage = ({ product, addItem, allProducts }) => {
  if (!product) {
    // This case should ideally be handled by the parent component (App.jsx route)
    return <div className="text-center p-10 text-xl font-semibold">Loading product details...</div>;
  }
  
  // Calculate final price for consistency
  const finalPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));

  // Helper component for the Action Buttons
  // Uses the passed 'addItem' function
  const navigate = useNavigate();

  const ActionButtons = () => (
    <div className="max-w-md mx-auto flex space-x-3">
    {/* Add to Cart */}
    <button
      onClick={() => addItem(product)}
      className="flex-1 py-3 bg-[#FF9800] text-white font-semibold rounded-lg hover:bg-[#f57c00] transition flex items-center justify-center gap-2 text-sm shadow-md"
    >
      <ShoppingCart size={18} /> Add to Cart
    </button>

    {/* Buy Now */}
    <button
      onClick={() => {
        addItem(product);
        navigate('/cart');
      }}
      className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm shadow-md"
    >
      <Zap size={18} /> Buy Now
    </button>
  </div>
  );
  
// service guarantees information
  const ServiceGuarantees = () => (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white lg:hidden">
      <h3 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">Delivery & Services</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <Truck size={20} className="text-green-500 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">Free Standard Delivery</p>
            <p className="text-xs text-gray-500">Expected by 2-5 days</p>
          </div>
        </div>
        <div className="flex items-center">
          <Package size={20} className="text-blue-500 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">7 Days Easy Replacement</p>
            <p className="text-xs text-gray-500">Original box & condition required</p>
          </div>
        </div>
        <div className="flex items-center">
          <Shield size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">1 Year Manufacturer Warranty</p>
            <p className="text-xs text-gray-500">Covered against manufacturing defects</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="min-h-screen bg-gray-100 pb-20 md:pb-0 font-sans">
      {/* === MAIN PRODUCT CONTAINER === */}
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-8 p-4 md:p-8 bg-white md:shadow-xl md:rounded-xl">
        
        {/* Left Column: Product Media (Image Gallery) - DESKTOP (1/3 width) */}
        <div className="hidden md:block col-span-1">
        <div className="sticky top-16"> {/* Adjusted top for sticky header */}
            <img 
                src={product.img || `https://placehold.co/500x400/2874F0/ffffff?text=${product.name}`} 
                alt={product.name} 
                className="w-full h-auto object-contain mb-4 border rounded-lg shadow-md" 
                onError={(e) => (e.target.src = `https://placehold.co/500x400/cccccc/333?text=${product.name}`)}
            />
            {/* Thumbnail Gallery Placeholder */}
            <div className="flex space-x-2 overflow-x-auto justify-center">
              {/* Using a placeholder for multiple image variants */}
              {[1, 2, 3].map(i => (
                <div key={i} className="w-16 h-16 bg-gray-200 border-2 border-transparent hover:border-blue-600 rounded-md cursor-pointer">
                    <img 
                        src={`https://placehold.co/64x64/2874F0/ffffff?text=V${i}`} 
                        alt={`Variant ${i}`} 
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Details, Price, and Actions - DESKTOP (1/3 width) */}
        <div className="col-span-1 hidden lg:block ">
          <h1 className="text-3xl font-bold text-gray-900 ">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">{product.brand}</p>
          
          <div className="mb-6 border-b pb-4">
            <span className="text-4xl font-extrabold text-[#0b8043]">₹{finalPrice.toLocaleString()}</span>
            <span className="ml-3 text-xl line-through text-gray-500">₹{product.price.toLocaleString()}</span>
            <span className="ml-2 text-red-500 font-bold text-lg">({product.discount}% OFF)</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">{product.desc}</p>
          
          {/* Action buttons (only visible on desktop here) */}
          <div className="hidden md:block mb-8">
            <ActionButtons />
          </div>
          
          {/* Product Variant Selector Placeholder */}
          <div className="mb-6">
             <p className="font-semibold mb-2 text-gray-700">Storage/RAM: <span className="text-gray-900 font-bold">128GB/8GB</span></p>
             <div className="flex space-x-2">
               {['64GB', '128GB', '256GB'].map(variant => (
                 <span key={variant} className={`p-2 border rounded-md text-sm cursor-pointer transition ${variant === '128GB' ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold' : 'hover:border-blue-600'}`}>{variant}</span>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Highlights & Assurances - DESKTOP (1/3 width) */}
        <div className="hidden md:block col-span-1">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Key Specifications</h2>
          <ul className="space-y-3 mb-6 text-gray-700">
            {/* Mocked/Placeholder Highlights since the mock data only has a 'desc' field */}
            {['200MP Quad Camera', 'Snapdragon 8 Gen 3', '6.8-inch Dynamic AMOLED 2X', 'IP68 Water Resistance'].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                {item}
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-bold mb-3 border-t pt-4">Service Guarantees</h3>
          <div className="flex justify-between text-center border-b pb-3">
             <div className="text-sm font-medium text-gray-600">7 Days Replacement</div>
             <div className="text-sm font-medium text-gray-600">Free Delivery</div>
             <div className="text-sm font-medium text-gray-600">Assured Quality</div>
          </div>
        </div>
        
        {/* --- MOBILE LAYOUT (Single Column) --- */}
        
        {/* Single Image on Mobile */}
        <div className="md:hidden col-span-3 mb-4">
           <img 
               src={product.img || `https://placehold.co/500x400/2874F0/ffffff?text=${product.name}`} 
               alt={product.name} 
               className="w-full h-auto object-contain rounded-lg shadow-md" 
               onError={(e) => (e.target.src = `https://placehold.co/500x400/cccccc/333?text=${product.name}`)}
           />
        </div>
        
        {/* Mobile-only Details section below image */}
        <div className="md:hidden col-span-3 p-4 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-2">{product.brand}</p>
             <div className="mb-4 border-b pb-2">
                <span className="text-3xl font-extrabold text-[#0b8043]">₹{finalPrice.toLocaleString()}</span>
                <span className="ml-2 text-base line-through text-gray-500">₹{product.price.toLocaleString()}</span>
                <span className="ml-2 text-red-500 font-bold text-sm">({product.discount}% OFF)</span>
            </div>
            
            <p className="text-base text-gray-700 mb-4">{product.desc}</p>
            <div className="mb-6">
             <p className="font-semibold mb-2 text-gray-700">Storage/RAM: <span className="text-gray-900 font-bold">128GB/8GB</span></p>
             <div className="flex space-x-2">
               {['64GB', '128GB', '256GB'].map(variant => (
                 <span key={variant} className={`p-2 border rounded-md text-sm cursor-pointer transition ${variant === '128GB' ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold' : 'hover:border-blue-600'}`}>{variant}</span>
               ))}
             </div>
          </div>
            
             <h2 className="text-xl font-bold mt-4 mb-2">Key Highlights</h2>
              <ul className="space-y-2 mb-6 text-gray-700">
                {/* Mobile highlights (same as desktop right column) */}
                {['200MP Quad Camera', 'Snapdragon 8 Gen 3', '6.8-inch Dynamic AMOLED 2X'].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    {item}
                  </li>
                ))}
                <button className="text-blue-600 font-semibold text-sm mt-1">View Full Specification Sheet</button>
              </ul>
        </div>
        <ServiceGuarantees />
      </div>
      
      {/* === SUGGESTION PRODUCTS (Visible on both) === */}
      <div className="mt-8">
        <SuggestedProducts allProducts={allProducts} product={product} />
      </div>
      <div className="mt-8">
        <SuggestedAccessories allProducts={allProducts} product={product} />
      </div>

      {/* === STICKY FOOTER (MOBILE ONLY) === */}
      <div className="fixed bottom-0 left-0 right-0 z-[10000] md:hidden bg-white border-t border-gray-200 p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <ActionButtons />
      </div>
      
      
    </div>
    
    
    </>  
  );
};

export default ProductDetailPage;