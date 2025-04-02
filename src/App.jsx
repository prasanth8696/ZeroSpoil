import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Communities from "./components/Communities";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import AvailableFor from "./components/AvailableFor";
import LowestPriceSection from "./components/LowestPriceSection";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <Router>
      
      

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} userType={userType} setIsAuthenticated={setIsAuthenticated} />

        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <HeroSection />
                  {!isAuthenticated || userType !== "restaurant" ? <Communities /> : null}
                </>
              } 
            />
            <Route path="/signup/:type" element={<Signup setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
            <Route path="/profile" element={isAuthenticated ? <h1 className="text-center">Profile</h1> : <Navigate to="/" />} />
            <Route path="/register" element={<h1 className="text-center">Register</h1>} />
            <Route path="/communities" element={<h1 className="text-center">Community</h1>} />
            <Route path="/dashboard" element={<h1 className="text-center">Dashboard</h1>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
