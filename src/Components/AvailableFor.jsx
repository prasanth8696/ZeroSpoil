// src/components/AvailableFor.js
 import React from 'react';
import CategoryCard from './CategoryCard'; // Adjust path if needed

// --- Sample Data ---
// Replace with your actual data, potentially fetched from an API
// Use real image URLs
const categoriesData = [
  {
    id: 1,
    title: 'Burgers & Fast Food',
    image: 'https://via.placeholder.com/300x200/FFA07A/000000?text=Fast+Food', // Replace with actual image URL
  },
  {
    id: 2,
    title: 'Salads',
    image: 'https://via.placeholder.com/300x200/98FB98/000000?text=Salads', // Replace with actual image URL
  },
  {
    id: 3,
    title: 'Breakfast & Desserts',
    image: 'https://via.placeholder.com/300x200/FFD700/000000?text=Breakfast', // Replace with actual image URL
  },
  {
    id: 4,
    title: 'Pizza',
    image: 'https://via.placeholder.com/300x200/DC143C/FFFFFF?text=Pizza', // Replace with actual image URL
  },
  {
    id: 5,
    title: 'Grills',
    image: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Grills', // Replace with actual image URL
  },
  {
    id: 6,
    title: 'Soups',
    image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Soups', // Replace with actual image URL
  },
  // Add more categories as needed
];
// --- End Sample Data ---


const AvailableFor = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"> {/* Optional background */}
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-left text-gray-800 dark:text-gray-200 mb-8">
          Available for free
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.id} // Essential key prop for lists
              imageSrc={category.image}
              title={category.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableFor;