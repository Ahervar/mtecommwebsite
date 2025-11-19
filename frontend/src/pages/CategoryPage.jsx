import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// FIX: Added explicit '.jsx' extension to resolve the "Could not resolve" error.
import ProductCard from '../components/ProductCard.jsx';

// This function determines the title based on the category slug
const formatTitle = (slug) => {
    // 1. Capitalize the first letter
    let title = slug.charAt(0).toUpperCase() + slug.slice(1);
    // 2. Insert spaces before capital letters (for tags like iPhoneDeals)
    title = title.replace(/([A-Z])/g, ' $1').trim(); 
    // 3. Simple replacements for common slugs (e.g., 'secondhand' -> 'Second Hand')
    title = title.replace('Secondhand', 'Second Hand');
    return title;
};

// 1. Accept 'allProducts' as a prop from App.jsx
export default function CategoryPage({ allProducts }) {
    // Get the dynamic part of the URL (e.g., 'trending', 'iphonedeals', 'apple', 'android')
    const { category } = useParams(); 
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    // Format the URL parameter for display
    const title = formatTitle(category); 

    // 2. Use useEffect to filter the products from the prop when the prop OR category changes
    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            setFilteredProducts([]);
            return;
        }

        const normalizedCategory = category.toLowerCase(); // e.g., 'android', 'apple'
      
        /**
         * Local Helper: normalizeWord
         * Used for singular/plural comparison (e.g., 'Smartphones' -> 'smartphone')
         * Since this is a small helper and it's not reused elsewhere, defining it here is fine.
         * @param {string} word - The word to normalize.
         * @returns {string} - The normalized (lowercase, singularized) word.
         */
        const normalizeWord = (word) => {
            if (!word) return '';
            return word.toLowerCase().replace(/s$/, ''); 
        }
        
        // This is only used for the categoryMatch (e.g., matching 'smartphone' slug against product.category 'Smartphones')
        const slugCatSingular = normalizeWord(normalizedCategory); 

        const filtered = allProducts.filter((p) => {
            // Normalize product category for comparison
            const productCat = p.category ? normalizeWord(p.category) : '';
            
            // 1. Match category (singular/plural insensitive)
            // e.g., URL 'smartphone' matches product category 'Smartphones'
            const categoryMatch = productCat === slugCatSingular;
            
            // 2. Match tags (Check if any product tag matches the URL slug or a substring of it)
            const tagMatch =
            p.tags &&
            p.tags.some((tag) => {
              const t = tag.toLowerCase();
              // match exact tag, plural/singular forms, and partials
              return (
                t === normalizedCategory ||
                t.replace(/s$/, '') === normalizedCategory.replace(/s$/, '') ||
                t.includes(normalizedCategory)
              );
            });
          
            
            // 3. Match brand (Match product brand against the full URL slug)
            // This allows URL 'apple' to match brand 'Apple'
            const brandMatch =
                p.brand && p.brand.toLowerCase() === normalizedCategory;
            
            return categoryMatch || tagMatch || brandMatch;
        });
        
        setFilteredProducts(filtered);
    }, [allProducts, category]); // Dependency on the prop and the URL parameter


    // Display a basic loading state if data hasn't arrived from App.jsx yet
    if (!allProducts || allProducts.length === 0) {
        return (
            <div className="flex justify-center items-center h-[50vh] text-gray-600 text-lg">
                Loading all products for {title}...
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 border-b pb-2">
                {title} Products
            </h1>
            
            {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-xl text-gray-500">
                    No products found under the category or tag: "{title}".
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}