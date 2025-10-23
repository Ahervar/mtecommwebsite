import React, { useState, useEffect } from 'react';
// Remove axios import
import ProductCard from '../components/ProductCard';

// 1. Accept 'allProducts' as a prop from App.jsx
export default function Smartphones({ allProducts }) {
  const [smartphoneProducts, setSmartphoneProducts] = useState([]);

  // 2. Use useEffect to filter the products from the prop when it changes
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Filter the products where the category is 'Smartphone'
      const filtered = allProducts.filter(p => p.category === 'Smartphone');
      setSmartphoneProducts(filtered);
    } else {
      setSmartphoneProducts([]);
    }
  }, [allProducts]); // Dependency on the prop

  // Optional: Add a loading state if allProducts is empty
  if (!allProducts || allProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-600 text-lg">
        Loading smartphones...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Smartphones</h1>
      <div className="bg-gray-100 p-6 rounded">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {smartphoneProducts.map((p) => (
            // The ProductCard is already updated with the new cart logic
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}