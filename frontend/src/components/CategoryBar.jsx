import { Link } from "react-router-dom";
import React from 'react';

const categories = [
  { name: "Smartphones", icon: "📱" },
  { name: "Accessories", icon: "🎧" },
  { name: "Laptops", icon: "💻" },
  { name: "Wearables", icon: "⌚" },
  { name: 'Tablets', icon: '📟' },
  { name: "Chargers", icon: "⚡" },
  { name: "Audio", icon: "🎵" },
];

export default function CategoryBar() {
  return (
    <div className="flex overflow-x-auto no-scrollbar gap-6 py-4 px-4 bg-white shadow-sm rounded-xl border border-gray-100  items-center">
    {categories.map((cat) => (
      <Link
        key={cat.name}
        // The 'to' prop defines the destination URL.
        // It will create a path like '/products/smartphones'.
        to={`/category/${cat.name.toLowerCase()}`}
        
        // Keep all your styling on the Link component
        className="flex flex-col items-center text-center min-w-[90px] cursor-pointer hover:scale-105 transition-transform"
      >
        <div className="text-4xl mb-2">{cat.icon}</div>
        <p className="text-gray-700 font-semibold text-sm">{cat.name}</p>
      </Link>
    ))}
    
  </div>
  );
}
