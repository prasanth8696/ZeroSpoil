// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Optional: if you want cards to link somewhere

const ProductCard = ({ image, category, name, discount, slug }) => {
  // Optional: Construct the link URL if slug is provided
  const linkTo = slug ? `/restaurants/${slug}` : '#'; // Example route, adjust as needed

  return (
    // Use Link if slug exists, otherwise use a div
    // The outer element handles positioning context and hover effects
    <Link
      to={linkTo}
      className={`relative block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out ${!slug ? 'pointer-events-none' : ''}`} // Disable link pointer events if no slug
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name} // Important for accessibility
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" // Added subtle zoom on hover
      />

      {/* Discount Badge (Only render if discount is provided) */}
      {discount && (
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-80 text-white text-xs font-bold px-2.5 py-1 rounded">
          -{discount}%
        </div>
      )}

      {/* Gradient Overlay & Text Content */}
      {/* Starts transparent at top, darkens towards bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-orange-400 dark:text-orange-300 text-xs font-medium uppercase tracking-wider mb-0.5">
          {category}
        </p>
        <h3 className="text-white text-base font-semibold leading-tight">
          {name}
        </h3>
      </div>
    </Link>
  );
};

// Default prop if discount is not always present
ProductCard.defaultProps = {
  discount: null,
  slug: null,
};

export default ProductCard;