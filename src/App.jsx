import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import Communities from "./Components/Communities";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import AvailableFor from "./Components/AvailableFor";
import AddItemsPage from "./Components/AddItemsPage";
import Cart from "./Components/Cart";

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
          isAuthenticated && userType === "restaurant" ? (
       <AddItemsPage />
                     ) : (
                   <>
                  <HeroSection />
                <Communities />
              <AvailableFor />
                       </>
                    )
                   }
                    />
           
            
            <Route path="/signup/:type" element={<Signup setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
           
            <Route path="/profile" element={isAuthenticated ? <h1 className="text-center">Profile</h1> : <Navigate to="/" />} />
            <Route path="/register" element={<h1 className="text-center">Register</h1>} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/availablefree" element={<AvailableFor />} />
            <Route path="/cart" element={<Cart />} />
            

            
          </Routes>
    
        </div>
                
        <Footer />
      </div>
    </Router>
  );
};

export default App;
