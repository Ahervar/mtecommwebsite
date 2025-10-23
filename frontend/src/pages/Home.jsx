import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBar from '../components/CategoryBar';


// ✅ Utility function
const filterProductsByTag = (products, tag) => {
  return products.filter(p => p.tags && p.tags.includes(tag)).slice(0, 10);
};

// ✅ Reusable Product Carousel Section

const ProductCarousel = ({ title, products, category }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 my-14">
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800 leading-snug break-words mr-4 flex-shrink min-w-0">
        {title}
        </h2>

        {category && (
          <Link
            to={`/category/${category.toLowerCase()}`}
            className="text-[#2874F0] hover:underline font-semibold"
          >
            View All →
          </Link>
        )}
      </div>

      {/* --- Product Grid (4 per row) --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

// ✅ Main Home Page
export default function Home({ allProducts }) {

  // --- Filtered product sections ---
  const trendingSmartphones = filterProductsByTag(allProducts, 'Trending');
  const iphoneDeals = filterProductsByTag(allProducts, 'iPhoneDeals');
  const newAccessories = filterProductsByTag(allProducts, 'NewAccessory');

  // --- Hero Carousel (static banners) ---
  const heroBanners = [
    {
      title: 'Welcome to Mehul Telecom',
      subtitle: 'Your one-stop shop for the latest mobile technology and accessories.',
      bg: 'from-[#2874F0] to-[#1f5fcc]',
      cta1: 'Shop Now',
      cta2: 'View Deals'
    },
    {
      title: 'Exclusive iPhone Deals',
      subtitle: 'Save up to 20% on Apple products this season.',
      bg: 'from-[#ff416c] to-[#ff4b2b]',
      cta1: 'Grab Offer',
      cta2: 'Learn More'
    },
    {
      title: 'New Accessories Collection',
      subtitle: 'Enhance your mobile experience with premium accessories.',
      bg: 'from-[#00b09b] to-[#96c93d]',
      cta1: 'Shop Accessories',
      cta2: 'Explore'
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="space-y-20">

      {/* --- Categories Bar --- */}

      <div className="mb-8">
            <CategoryBar />
      </div>
      
      
      {/* --- Hero Carousel --- */}
      <div className={`bg-gradient-to-r ${heroBanners[currentBanner].bg} p-10 md:p-16 rounded-3xl shadow-2xl text-white transition-all duration-700`}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{heroBanners[currentBanner].title}</h1>
        <p className="text-lg md:text-xl font-light text-white/90 mb-6">{heroBanners[currentBanner].subtitle}</p>
        <div className="flex gap-4">
          <button className="bg-[#FF9F00] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffc107] transition">
            {heroBanners[currentBanner].cta1}
          </button>
          <button className="bg-white text-[#2874F0] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            {heroBanners[currentBanner].cta2}
          </button>
        </div>
      </div>



{/* --- Product Carousels --- */}
<div className="space-y-16">

  <ProductCarousel 
    title="🔥 Trending Smartphones" 
    products={trendingSmartphones} 
    category="smartphone"
  />

  <ProductCarousel 
    title="🍎 iPhone Exclusive Deals" 
    products={iphoneDeals} 
    category="apple"
  />

  <ProductCarousel 
    title="🎧 Latest Accessories" 
    products={newAccessories} 
    category="accessories"
  />

  <ProductCarousel
    title="💥 Top Rated Phones"
    products={allProducts.filter(p => p.rating >= 4.5).slice(0, 10)}
    category="smartphone"
  />

  <ProductCarousel
    title="💰 Best Budget Picks (Under ₹20,000)"
    products={allProducts.filter(p => p.price < 20000).slice(0, 10)}
    category="budget"
  />

  <ProductCarousel
    title="⚡ Latest Launches"
    products={allProducts.filter(p => p.tags && p.tags.includes('NewLaunch')).slice(0, 10)}
    category="newlaunch"
  />

  <ProductCarousel
    title="🎁 Festival Offers"
    products={allProducts.filter(p => p.tags && p.tags.includes('Discount')).slice(0, 10)}
    category="offers"
  />

  <ProductCarousel
    title="🎮 Gadgets & Accessories"
    products={allProducts.filter(p => p.category === 'Accessories').slice(0, 10)}
    category="accessories"
  />

</div>


    </div>
  );
}
