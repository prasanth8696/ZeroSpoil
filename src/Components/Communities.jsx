// src/components/Communities.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const communities = [
  { name: "Indian food donators" },
  { name: "Donators world" },
  { name: "KFC West London" },
  { name: "Texas Chicken" },
  { name: "Burger King" },
  { name: "Shaurma 1" },
];

const Communities = () => {
  const [communityLogos, setCommunityLogos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const updated = await Promise.all(
        communities.map(async (community) => {
          try {
            const res = await axios.get('https://api.pexels.com/v1/search', {
              headers: {
                Authorization: PEXELS_API_KEY,
              },
              params: {
                query: community.name,
                per_page: 1,
              },
            });
            const photo = res.data.photos[0];
            return {
              ...community,
              image: photo?.src?.medium || '', // fallback
            };
          } catch (err) {
            console.error(`Error loading image for ${community.name}:`, err);
            return { ...community, image: '' };
          }
        })
      );
      setCommunityLogos(updated);
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 dark:text-white">
      
        Communities in Zero Spoil
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        {communityLogos.map((community, index) => (
          <Link to="/communities" key={index}>
            <div className="w-36 md:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-center cursor-pointer hover:shadow-xl transition">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-20 object-cover rounded"
              />
              <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">
                {community.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Communities;
