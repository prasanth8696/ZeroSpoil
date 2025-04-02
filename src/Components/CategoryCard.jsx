import React from 'react';

const CategoryCard = ({ imageSrc, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <img
        src={imageSrc}
        alt={title} // Important for accessibility
        className="h-28 w-full object-cover" // Adjust height (h-28) as needed
      />
      <div className="p-3 text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;