import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom"; // useParams is included here
// import axios from "axios"; 
import Home from "./pages/Home";
import Smartphones from "./pages/Smartphones";
import Accessories from "./pages/Accessories";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/useCart"; 
// FIX: Changed .json to .js to match the file content (const... export default...)
import MOCK_PRODUCTS from "../../backend/data/products.js"; 
import ProductDetailPage from './components/ProductDetailPage';

import { Smartphone, Headphones, LayoutGrid, Heart, Search, ShoppingCart, X, Menu, Zap, ArrowLeft, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';

// --- Nav Bar Component (Extracted for useCart hook) ---

const NavigationBar = ({ allProducts, handleSearch, searchTerm, filteredProducts, setSearchTerm }) => {
// ... rest of NavigationBar component remains the same
  // Use the cart hook to get the count
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false); 
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) { // Tailwind's 'lg' breakpoint
            setMenuOpen(false);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);
  
  
  
  return (
<header className="bg-[#2874F0] text-white shadow-md sticky top-0 z-50">
  {/* --- Top Row: Logo, Search, Cart --- */}
  <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">

    {/* --- Logo --- */}
    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
      <div className="bg-white text-[#2874F0] font-bold px-3 py-1 rounded text-xl">
        MT
      </div>
      <div>
        <div className="font-bold text-xl leading-none">Mehul Telecom</div>
        <div className="text-xs text-white/80 hidden sm:block">
          Smartphones & Accessories
        </div>
      </div>
    </Link>

    {/* --- Search Bar (Desktop) --- */}
<div className="relative flex-grow max-w-xl mx-4 hidden lg:flex items-center">
  <div className="flex items-center bg-white rounded-full shadow-sm px-4 py-2 w-full focus-within:ring-2 focus-within:ring-[#1f5fcc] transition">
    <Search size={20} className="text-gray-500" />
    <input
      type="text"
      placeholder="Search for products, brands, and more..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      className="ml-3 w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
    />
  </div>

  {/* Search results dropdown (Desktop) */}
  {searchTerm.trim() !== "" && (
    <div className="absolute top-full left-0 right-0 bg-white text-gray-900 shadow-2xl rounded-lg mt-2 max-h-72 overflow-auto z-50 border border-gray-200">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition w-full text-left"
            onClick={() => setSearchTerm("")}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-10 h-10 object-contain rounded"
              onError={(e) => (e.target.src = 'https://placehold.co/40x40/cccccc/333?text=N/A')}
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm">{item.name}</span>
              <span className="text-xs text-green-600 font-semibold">₹{item.price?.toLocaleString()}</span>
            </div>
          </Link>
        ))
      ) : (
        <div className="p-3 text-sm text-gray-500">No results found for “{searchTerm}”</div>
      )}
    </div>
  )}
</div>


    {/* --- Cart + Menu Toggle --- */}
    <div className="flex items-center space-x-4">
      <Link to="/cart" className="relative p-2 hover:bg-white/20 rounded-lg transition duration-200 flex items-center cursor-pointer">
        <ShoppingCart size={24} />
        <span className="hidden sm:inline-block ml-2 font-semibold">Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#2874F0]">
            {cartCount}
          </span>
        )}
      </Link>

      <button
        className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
    {/* --- Mobile Search (FIXED) --- */}
<div className="w-full block lg:hidden mt-3 px-2">
  <div className="flex items-center bg-white rounded-full shadow-sm px-3 py-2">
    <Search size={18} className="text-gray-500" />
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)} // <-- FIX: Added state binding
      className="ml-2 w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
    />
  </div>
  {/* Search results dropdown (Mobile, same logic as desktop) */}
  {searchTerm.trim() !== "" && (
    <div className="absolute left-0 right-0 bg-white text-gray-900 shadow-2xl rounded-lg mt-2 max-h-72 overflow-auto z-40 border border-gray-200 mx-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition w-full text-left"
            onClick={() => setSearchTerm("")}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-10 h-10 object-contain rounded"
              onError={(e) => (e.target.src = 'https://placehold.co/40x40/cccccc/333?text=N/A')}
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm">{item.name}</span>
              <span className="text-xs text-green-600 font-semibold">₹{item.price?.toLocaleString()}</span>
            </div>
          </Link>
        ))
      ) : (
        <div className="p-3 text-sm text-gray-500">No results found for “{searchTerm}”</div>
      )}
    </div>
  )}
</div>

  </div>

{/* --- Second Row: Navigation Links (Responsive) --- */}
  <nav className="bg-[#1a4fd8] py-2 hidden lg:block"> {/* <-- FIX: Added hidden lg:block */}
    <div className="container mx-auto px-4">
      
      {/* Desktop Links: Always visible on large screens */}
      <div className="flex justify-center gap-6 text-sm font-semibold">
        <Link to="/" className="hover:underline">Home</Link>

        <div className="group relative">
          <Link to="/smartphones" className="hover:underline">Smartphones</Link>
          {/* Desktop Dropdown */}
          <div className="hidden group-hover:block absolute top-full left-0 bg-white text-black shadow-lg rounded-md w-48 z-40">
            <Link to="/category/android" className="block px-4 py-2 hover:bg-gray-100">Android Phones</Link>
            <Link to="/category/apple" className="block px-4 py-2 hover:bg-gray-100">iPhones</Link>
          </div>
        </div>

        <div className="group relative">
          <Link to="/accessories" className="hover:underline">Accessories</Link>
          {/* Desktop Dropdown */}
          <div className="hidden group-hover:block absolute top-full left-0 bg-white text-black shadow-lg rounded-md w-48 z-40">
            <Link to="/category/headphones" className="block px-4 py-2 hover:bg-gray-100">Headphones</Link>
            <Link to="/category/earbuds" className="block px-4 py-2 hover:bg-gray-100">Earbuds</Link>
            <Link to="/category/chargers" className="block px-4 py-2 hover:bg-gray-100">Chargers</Link>
          </div>
        </div>

        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>

    </div>
  </nav>
  
      {/* Mobile Menu Dropdown: Visibility controlled by menuOpen state */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1f5fcc] shadow-xl border-t border-blue-500 pb-2">
          
          {/* Main Links */}
          <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8]">Home</Link>
          
          {/* Smartphones with nested link structure */}
          <Link to="/smartphones" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8]">Smartphones</Link>
          <div className="pl-6 text-xs bg-[#1743a6] border-l-4 border-white/50">
            <Link to="/category/android" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-[#1f5fcc]">Android Phones</Link>
            <Link to="/category/apple" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-[#1f5fcc]">iPhones</Link>
          </div>

          {/* Accessories with nested link structure */}
          <Link to="/accessories" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8]">Accessories</Link>
          <div className="pl-6 text-xs bg-[#1743a6] border-l-4 border-white/50">
            <Link to="/category/headphones" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-[#1f5fcc]">Headphones</Link>
            <Link to="/category/earbuds" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-[#1f5fcc]">Earbuds</Link>
            <Link to="/category/chargers" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-[#1f5fcc]">Chargers</Link>
          </div>

          {/* Utility Links */}
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8]">About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8]">Contact</Link>
        </div>
      )}
  
</header>
  );
};

// --- Main App Component ---

// === PRODUCT DETAIL WRAPPER (fetch product from URL) ===
const ProductDetailWrapper = ({ allProducts }) => {
  const { id } = useParams();
  const { addItem } = useCart(); // ✅ get addItem from cart context
  const product = allProducts.find((p) => String(p.id) === String(id));

  return <ProductDetailPage product={product} addItem={addItem} />;
};


export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products from the MOCK_PRODUCTS file instead of a server
  useEffect(() => {
    // The imported variable from products.js will be available here.
    setAllProducts(MOCK_PRODUCTS);
    // Removed dependency on axios and external API call
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 8));
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        
        {/* 🧭 NAVBAR START */}
        <NavigationBar
          allProducts={allProducts}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          filteredProducts={filteredProducts}
          setSearchTerm={setSearchTerm}
        />
        {/* 🧭 NAVBAR END */}

        <main className="container mx-auto py-6 px-4">
          <Routes>
            {/* Pass the product data to the pages that need it */}
            <Route path="/" element={<Home allProducts={allProducts} />} />
            <Route path="/smartphones" element={<Smartphones allProducts={allProducts} />} />
            <Route path="/accessories" element={<Accessories allProducts={allProducts} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:category" element={<CategoryPage allProducts={allProducts} />} />
            {/* Future route for specific product details */}
            <Route path="/product/:id" element={<ProductDetailWrapper allProducts={allProducts} />} />
            <Route path="/category/:category" element={<CategoryPage allProducts={allProducts} />} />


          </Routes>
        </main>

         <footer className="bg-[#172337] text-white mt-12 py-8 px-4">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                
                {/* About Section */}
                <div className="space-y-3">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">About</h4>
                    <Link to="/about" className="block hover:text-[#2874F0] transition">Contact Us</Link>
                    <Link to="/about" className="block hover:text-[#2874F0] transition">About Us</Link>
                    <Link to="/about" className="block hover:text-[#2874F0] transition">Careers</Link>
                </div>
                
                {/* Help Section */}
                <div className="space-y-3">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">Help</h4>
                    <Link to="/contact" className="block hover:text-[#2874F0] transition">Payments</Link>
                    <Link to="/contact" className="block hover:text-[#2874F0] transition">Shipping</Link>
                    <Link to="/contact" className="block hover:text-[#2874F0] transition">Cancellation & Returns</Link>
                </div>
                
                {/* Policy Section */}
                <div className="space-y-3">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">Policy</h4>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block hover:text-[#2874F0] transition">Terms of Use</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block hover:text-[#2874F0] transition">Security</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block hover:text-[#2874F0] transition">Privacy</a>
                </div>
                
                {/* Mail Us / Registered Office (Contact Mock) */}
                <div className="space-y-3 text-white/80">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">Registered Office</h4>
                    <p>Mehul Telecom Private Limited, Building 101, Near Tech Park, Mumbai - 400001, India.</p>
                </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="container mx-auto border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>&copy; 2024 Mehul Telecom. All Rights Reserved.</p>
                <div className="mt-2 md:mt-0 flex space-x-4">
                    <span>Secured Payments</span>
                    {/* Mock payment icons with inline SVGs/text */}
                    <span>| Visa | MasterCard | UPI |</span>
                </div>
            </div>
          </footer>
      </div>
    </CartProvider>
  );
}

// --- Placeholder for Product Detail Page (Needed for search links) ---
// Since this wasn't in your original plan, we need a simple placeholder
// const ProductDetail = ({ allProducts }) => {
//   const { id } = useParams();
//   const product = allProducts.find(p => p.id === parseInt(id));

//   if (!product) {
//     return (
//       <div className="p-8 text-center bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
//         <p className="mt-2 text-gray-600">The product with ID {id} could not be located.</p>
//         <Link to="/" className="mt-4 inline-block px-4 py-2 bg-[#2874F0] text-white rounded hover:bg-[#1f5fcc]">
//           Go to Home
//         </Link>
//       </div>
//     );
//   }

//   // A basic view for now. You can expand this later.
//   return (
//     <div className="bg-white p-6 md:p-12 rounded-xl shadow-xl flex flex-col md:flex-row gap-8">
//         <div className="md:w-1/3 flex items-center justify-center bg-gray-50 rounded-lg p-4">
//             <img src={product.img} alt={product.name} className="max-h-80 object-contain" />
//         </div>
//         <div className="md:w-2/3">
//             <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//             <p className="mt-2 text-xl font-semibold text-gray-600">{product.brand}</p>
//             <p className="mt-4 text-gray-700">{product.desc}</p>
//             <div className="mt-6 flex items-baseline gap-4">
//                 <span className="text-4xl font-extrabold text-[#0b8043]">
//                     ₹{Math.round(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
//                 </span>
//                 <span className="text-xl text-gray-400 line-through">
//                     ₹{product.price.toLocaleString()}
//                 </span>
//                 <span className="text-lg font-medium text-red-500">
//                     ({product.discount}% OFF)
//                 </span>
//             </div>
//             <button
//                 className="mt-8 bg-[#2874F0] text-white text-lg px-8 py-3 rounded-lg hover:bg-[#1f5fcc] transition shadow-md"
//                 onClick={() => alert(`Adding ${product.name} to cart... (Functionality is in ProductCard)`)}
//             >
//                 Add to Cart
//             </button>
//         </div>
//     </div>
//   );
// };
