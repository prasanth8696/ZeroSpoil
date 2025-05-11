import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import HeroImage from "../Components/Images/pexels-diva-plavalaguna-6150432.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
=======
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
>>>>>>> 74d09c4 (Initial commit)

const HeroSection = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [customLocation, setCustomLocation] = useState("");
<<<<<<< HEAD

  useEffect(() => {
    // Fetch location using IP if no custom location is set
=======
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
>>>>>>> 74d09c4 (Initial commit)
    if (!customLocation) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.city || "Unknown Location");
        })
        .catch(() => {
          setLocation("Location not found");
        });
    }
  }, [customLocation]);

<<<<<<< HEAD
  const handleInputChange = (e) => {
    setCustomLocation(e.target.value);
  };
=======
  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const res = await axios.get("https://api.pexels.com/v1/search", {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: "food donation",
            per_page: 1,
          },
        });
        const image = res.data.photos[0]?.src?.landscape || "";
        setHeroImage(image);
      } catch (err) {
        console.error("Failed to load hero image:", err.message);
      }
    };

    fetchHeroImage();
  }, []);

  const handleInputChange = (e) => setCustomLocation(e.target.value);
>>>>>>> 74d09c4 (Initial commit)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && customLocation.trim() !== "") {
      setLocation(customLocation.trim());
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg p-5 justify-between px-6 md:px-20 py-12 max-w-7xl mx-auto dark:bg-gray-900">
<<<<<<< HEAD
      {/* Left Content */}
=======
>>>>>>> 74d09c4 (Initial commit)
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
            placeholder="Type district/state and press Enter"
            value={customLocation}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-transparent outline-none text-gray-700 dark:text-white"
          />
        </div>
      </div>

<<<<<<< HEAD
      {/* Right Image */}
      <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
        <img
          src={HeroImage}
          alt="People enjoying food"
=======
      <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
        <img
          src={heroImage || "https://via.placeholder.com/600x400"} // fallback image
          alt="Hero"
>>>>>>> 74d09c4 (Initial commit)
          className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
