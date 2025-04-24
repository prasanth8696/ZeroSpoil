// src/components/LowestPriceSection.js
import React from 'react';
import ProductCard from './ProductCard'; // Adjust path if needed

// --- Sample Data ---
// Replace with your actual data (image URLs, names, discounts, slugs)
const dealsData = [
  {
    id: 'deal-1',
    name: 'Chef Burgers London',
    category: 'Restaurant',
    discount: 40,
    image: 'https://via.placeholder.com/400x300/A9A9A9/000000?text=Burger+Deal+1', // Replace with actual image
    slug: 'chef-burgers-london', // Optional slug for linking
  },
  {
    id: 'deal-2',
    name: 'Grand Ai Cafe London',
    category: 'Restaurant',
    discount: 20,
    image: 'https://via.placeholder.com/400x300/D3D3D3/000000?text=Cafe+Deal+2', // Replace with actual image
    slug: 'grand-ai-cafe-london',
  },
  {
    id: 'deal-3',
    name: "Butterbrot Caf'e London",
    category: 'Restaurant',
    discount: 17,
    image: 'https://via.placeholder.com/400x300/C0C0C0/000000?text=Butterbrot+Deal+3', // Replace with actual image
    slug: 'butterbrot-cafe-london',
  },
  // Add more deals as needed
];
// --- End Sample Data ---


const LowestPriceSection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950"> {/* Adjust background as needed */}
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Lowest price in restaurant / grocery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dealsData.map((deal) => (
            <ProductCard
              key={deal.id} // Essential key prop
              image={deal.image}
              category={deal.category}
              name={deal.name}
              discount={deal.discount}
              slug={deal.slug} // Pass slug for linking
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LowestPriceSection;