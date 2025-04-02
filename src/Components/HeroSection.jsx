import HeroImage from "../Components/Images/pexels-diva-plavalaguna-6150432.jpg";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const HeroSection = () => {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setLocation(data.address.city || "Unknown Location");
            })
            .catch(() => setLocation("Location not found"));
        },
        () => {
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg p-5  justify-between px-6 md:px-20 py-12 max-w-7xl mx-auto dark:bg-gray-900 ">
      {/* Left Content */}
      <div className="md:w-1/2 text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Smart food Management, <br />
          <span className="text-green-600">Zero Waste impact</span>
        </h1>
        <div className="mt-6 flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md p-2 w-full max-w-lg">
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
            <FaMapMarkerAlt className="mr-2" /> {location}
          </button>
          <input
            type="text"
            placeholder="Search restaurant"
            className="w-full p-2 bg-transparent outline-none text-gray-700 dark:text-white"
          />
        </div>
      </div>
      {/* Right Image */}
      <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
        <img
          src={HeroImage}
          alt="People enjoying food"
          className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
