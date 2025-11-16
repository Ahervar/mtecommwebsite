import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Smartphones from "./pages/Smartphones";
import Accessories from "./pages/Accessories";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/useCart";
// Assuming MOCK_PRODUCTS is correctly imported from your project structure
import MOCK_PRODUCTS from "../../backend/data/products.js"; 
import ProductDetailPage from './components/ProductDetailPage';

import {
    Search, ShoppingCart, X, Menu,
    MonitorSmartphone, Headphones, Watch, Tablet, Zap as ChargerIcon, Music, Laptop,
    Smartphone, LayoutGrid, Heart, Zap, ArrowLeft, TrendingUp, DollarSign, CheckCircle
} from 'lucide-react';


const CATEGORY_LINKS = [
    { name: 'Smartphones', icon: MonitorSmartphone, to: '/smartphones' },
    { name: 'Accessories', icon: Headphones, to: '/accessories' },
    { name: 'Laptops', icon: Laptop, to: '/category/laptops' },
    { name: 'Wearables', icon: Watch, to: '/category/wearables' },
    { name: 'Tablets', icon: Tablet, to: '/category/tables' },
    { name: 'Chargers', icon: ChargerIcon, to: '/category/power' },
    { name: 'Audio', icon: Music, to: '/category/audio' },
];

const SMARTPHONE_DROPDOWN_LINKS = [
    // { name: 'Featured Phones', to: '/smartphones?filter=featured' },
    { name: 'Android Phones', to: '/category/android' },
    { name: 'iOS Phones', to: '/category/apple' },
    { name: 'Budget Devices', to: '/category/budget' },
];

const ACCESSORIES_DROPDOWN_LINKS = [
    { name: 'Headphones & Earbuds', to: '/category/audio' },
    { name: 'Chargers & Cables', to: '/category/power' },
    { name: 'Cases & Covers', to: '/category/protection' },
    { name: 'Smartwatches', to: '/category/wearables' },
];

// --- Dropdown Component for Desktop Nav Hover ---
const HoverDropdown = ({ name, mainTo, subLinks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Link */}
            <Link 
                to={mainTo} 
                className="flex items-center hover:underline transition duration-200 py-1"
            >
                {name}
            </Link>

            {/* Dropdown Content */}
            {isOpen && (
                <div 
                    className="absolute top-full left-0 mt-0 w-48 bg-white text-gray-800 shadow-xl rounded-b-lg border border-t-0 border-gray-200 z-50 animate-fade-in"
                >
                    {subLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition duration-150"
                            onClick={() => setIsOpen(false)} // Close menu on click
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- Navigation Bar Component ---
const NavigationBar = ({ allProducts, handleSearch, searchTerm, filteredProducts, setSearchTerm }) => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false); // NEW: Search focus state
  const headerRef = useRef(null);
  const lastScrollY = useRef(0); 
  // No separate ref needed for dropdown since we rely on `onBlur` timeout

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsScrolled(true);
        } else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
          setIsScrolled(false);
        }
        lastScrollY.current = currentScrollY;
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setIsScrolled(false);
      }
      updateMainContentPadding(); 
    };
    
    const updateMainContentPadding = () => {
      const headerElement = headerRef.current;
      const mainContent = document.querySelector('main.content-wrapper');

      if (!headerElement || !mainContent) return;

      const timer = setTimeout(() => {
        const totalHeight = headerElement.offsetHeight;
        mainContent.style.paddingTop = `${totalHeight + 24}px`;
      }, 150); 
      return () => clearTimeout(timer);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', updateMainContentPadding); 

    const headerObserver = new MutationObserver(updateMainContentPadding);
    if (headerRef.current) {
        headerObserver.observe(headerRef.current, { 
            childList: true, 
            subtree: true, 
            attributes: true, 
            attributeFilter: ['class', 'style'] 
        });
    }

    handleScroll(); 
    updateMainContentPadding();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', updateMainContentPadding);
      headerObserver.disconnect();
    };
  }, [isScrolled, menuOpen]); 

  // Function to handle blur: Hides suggestions, keeps text.
  const handleInputBlur = () => {
    // A small delay allows the click event on a result link to register before 
    // the suggestions disappear.
    setTimeout(() => {
        setIsSearchFocused(false);
    }, 150); 
  };


  const mobileTopRowClasses = `
    flex items-center justify-between px-4 py-3
    transition-all duration-300 ease-in-out
    ${isScrolled && window.innerWidth < 1024 
        ? 'opacity-0 h-0 overflow-hidden py-0' 
        : 'opacity-100 h-auto' 
    }
  `;

  const mobileSearchContainerClasses = `
    w-full block lg:hidden px-4 
    transition-all duration-300 ease-in-out
    ${isScrolled ? 'py-2' : 'pb-3'} 
  `;
  
  const desktopSearchContainerClasses = `
    relative flex-grow max-w-xl mx-4 hidden lg:flex items-center
  `;


  return (
    <header 
      ref={headerRef} 
      className="bg-[#2874F0] text-white shadow-md fixed top-0 left-0 right-0 z-50 w-full"
    >
      
      {/* 1. Desktop Main Header Row */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3 hidden lg:flex"> 
        
        {/* --- Logo (Left) --- */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-white text-[#2874F0] font-bold px-3 py-1 rounded text-xl">MT</div>
            <div>
              <div className="font-bold text-xl leading-none">Mehul Telecom</div>
              <div className="text-xs text-white/80 hidden sm:block">Smartphones & Accessories</div>
            </div>
        </Link>

        {/* --- Desktop Search Bar (Center) --- */}
        <div className={desktopSearchContainerClasses}>
            {/* FOCUS IMPROVEMENT: Use ring-white for better visibility */}
            <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2 w-full 
                            focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-[#2874F0] transition-all duration-200">
                <Search size={20} className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search for products, brands, and more..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)} // Show results on focus
                    onBlur={handleInputBlur} // Hide results on blur (with delay)
                    className="ml-3 w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" 
                />
            </div>
            {/* Desktop Search results dropdown - RENDERED ONLY IF TEXT EXISTS AND IS FOCUSED */}
            {searchTerm.trim() !== "" && isSearchFocused && (
                  <div 
                      className="absolute top-full left-0 right-0 bg-white text-gray-900 shadow-2xl rounded-lg mt-2 max-h-72 overflow-auto z-50 border border-gray-200"
                  >
                      {filteredProducts.length > 0 ? (
                          filteredProducts.map((item) => (
                              <Link
                                  key={item.id}
                                  to={`/product/${item.id}`}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition w-full text-left"
                                  onClick={() => {
                                      setSearchTerm(""); // Clear search term after navigation
                                      setIsSearchFocused(false); // Hide the dropdown
                                  }}
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

        {/* --- Desktop Cart --- */}
        <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-white/20 rounded-lg transition duration-200 flex items-center cursor-pointer active:bg-white/30" 
            >
              <ShoppingCart size={24} />
              <span className="ml-2 font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#2874F0]">
                  {cartCount}
                </span>
              )}
            </Link>
        </div>
      </div>
      
      {/* 2. Secondary Navigation Bar (Desktop ONLY, dark blue bar) */}
      <nav className="bg-[#1a4fd8] py-2 hidden lg:block"> 
          <div className="container mx-auto px-4">
              <div className="flex justify-center items-center gap-8 text-sm font-semibold">
                  <Link to="/" className="hover:underline transition duration-200">Home</Link>
                  
                  {/* --- HOVER DROPDOWN: Smartphones --- */}
                  <HoverDropdown
                    name="Smartphones"
                    mainTo="/smartphones"
                    subLinks={SMARTPHONE_DROPDOWN_LINKS}
                  />

                  {/* --- HOVER DROPDOWN: Accessories --- */}
                  <HoverDropdown
                    name="Accessories"
                    mainTo="/accessories"
                    subLinks={ACCESSORIES_DROPDOWN_LINKS}
                  />
                  
                  <Link to="/about" className="hover:underline transition duration-200">About</Link>
                  <Link to="/contact" className="hover:underline transition duration-200">Contact</Link>
              </div>
          </div>
      </nav>


      {/* --- Mobile View Container (Visible only on small screens) --- */}
      <div className="lg:hidden">
        
        {/* --- Mobile Top Row (Logo, Cart, Menu - HIDES on scroll) --- */}
        <div className={mobileTopRowClasses}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="bg-white text-[#2874F0] font-bold px-3 py-1 rounded text-xl">MT</div>
                <div>
                    <div className="font-bold text-xl leading-none">Mehul Telecom</div>
                </div>
            </Link>

            <div className="flex items-center space-x-4">
                {/* Cart Icon */}
                <Link
                    to="/cart"
                    className="relative p-2 hover:bg-white/20 rounded-lg transition duration-200 flex items-center cursor-pointer active:bg-white/30"
                >
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#2874F0]">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* Menu Toggle */}
                <button
                    className="p-2 hover:bg-white/20 rounded-lg transition duration-200 active:bg-white/30"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>

        {/* --- Mobile Search Bar (REMAINS VISIBLE & SHRINKS PADDING on scroll) --- */}
        <div className={mobileSearchContainerClasses}>
          {/* FOCUS IMPROVEMENT: Use ring-white for better visibility */}
          <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2 w-full
                          focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-[#2874F0] transition-all duration-200">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)} // Show results on focus
              onBlur={handleInputBlur} // Hide results on blur (with delay)
              className="ml-2 w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" 
            />
          </div>
          
          {/* Mobile Search results dropdown - Conditional rendering based on text and focus */}
          {searchTerm.trim() !== "" && isSearchFocused && (
            <div 
                className="absolute left-0 right-0 bg-white text-gray-900 shadow-2xl rounded-lg mt-2 max-h-72 overflow-auto z-40 border border-gray-200 mx-4"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition w-full text-left active:bg-gray-200" 
                    onClick={() => {
                        setSearchTerm(""); // Clear search term after navigation
                        setIsSearchFocused(false); // Hide the dropdown
                    }}
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


        {/* 3. Mobile Menu Dropdown (Below Search) */}
        {menuOpen && (
          <div className="bg-[#1f5fcc] shadow-xl border-t border-blue-500 pb-2">
              {CATEGORY_LINKS.map((link) => (
                  <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8] active:bg-[#1845b9]"
                  >
                      <link.icon size={20} />
                      {link.name}
                  </Link>
              ))}
              <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8] active:bg-[#1845b9] border-t border-white/20 mt-2 pt-3">About</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold hover:bg-[#1a4fd8] active:bg-[#1845b9]">Contact</Link>
          </div>
        )}
      </div>

    </header>
  );
};

// --- Helper component to wrap ProductDetailPage for routing ---

// --- Helper component to wrap ProductDetailPage for routing ---

const ProductDetailWrapper = ({ allProducts }) => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = allProducts.find((p) => String(p.id) === String(id));

  // Pass 'allProducts' prop down to ProductDetailPage
  return <ProductDetailPage product={product} addItem={addItem} allProducts={allProducts} />;
};


// --- Main App Component ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState(MOCK_PRODUCTS);

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
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-onload-fade-in {
            animation: fadeIn 0.8s ease-in-out forwards;
            opacity: 0;
          }
          
          /* NEW: CSS for the smoother hover dropdown effect */
          @keyframes fadeInMenu {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeInMenu 0.2s ease-out forwards;
          }
        `}
      </style>
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

        <main className="container mx-auto py-6 px-4 content-wrapper animate-onload-fade-in">
          <Routes>
            <Route path="/" element={<Home allProducts={allProducts} />} />
            <Route path="/smartphones" element={<Smartphones allProducts={allProducts} />} />
            <Route path="/accessories" element={<Accessories allProducts={allProducts} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:category" element={<CategoryPage allProducts={allProducts} />} />
            <Route path="/product/:id" element={<ProductDetailWrapper allProducts={allProducts} />} />
          </Routes>
        </main>

        <footer className="bg-[#172337] text-white mt-12 py-8 px-4">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

                <div className="space-y-3">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">About</h4>
                    <Link to="/about" className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Contact Us</Link>
                    <Link to="/about" className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">About Us</Link>
                    <Link to="/about" className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Careers</Link>
                </div>

                <div className="space-y-3">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">Help</h4>
                    <Link to="/contact" className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Payments</Link>
                    <Link to="/contact" className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Shipping</Link>
                    <Link to="/contact" className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Cancellation & Returns</Link>
                </div>

                <div className="space-y-3">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">Policy</h4>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Terms of Use</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Security</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block hover:text-[#2874F0] transition active:text-[#4f95ff]">Privacy</a>
                </div>

                <div className="space-y-3 text-white/80">
                    <h4 className="font-semibold uppercase text-gray-400 mb-2">Registered Office</h4>
                    <p>Mehul Telecom Private Limited, Building 101, Near Tech Park, Mumbai - 400001, India.</p>
                </div>
            </div>

            <div className="container mx-auto border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>&copy; 2024 Mehul Telecom. All Rights Reserved.</p>
                <div className="mt-2 md:mt-0 flex space-x-4">
                    <span>Secured Payments</span>
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
