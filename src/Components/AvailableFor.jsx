// src/components/AvailableFor.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const categoriesData = [
  { id: 1, title: 'Burgers & Fast Food' },
  { id: 2, title: 'Salads' },
  { id: 3, title: 'Breakfast & Desserts' },
  { id: 4, title: 'Pizza' },
  { id: 5, title: 'Grills' },
  { id: 6, title: 'Soups' },
];

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const AvailableFor = () => {
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedCategories = await Promise.all(
        categoriesData.map(async (category) => {
          try {
            const response = await axios.get('https://api.pexels.com/v1/search', {
              headers: {
                Authorization: PEXELS_API_KEY,
              },
              params: {
                query: category.title,
                per_page: 1,
              },
            });

            const photo = response.data.photos[0];
            return {
              ...category,
              image: photo?.src?.medium || '',
            };
          } catch (error) {
            console.error(`Error fetching image for ${category.title}:`, error);
            return { ...category, image: '' };
          }
        })
      );

      setCategoriesWithImages(updatedCategories);
    };

    fetchImages();
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-left text-gray-800 dark:text-gray-200 mb-8">
          Available for free
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categoriesWithImages.map((category) => (
            <Link to="/availablefree" key={category.id}>
              <CategoryCard
                imageSrc={category.image}
                title={category.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableFor;
