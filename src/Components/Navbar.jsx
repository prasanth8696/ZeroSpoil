import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ isAuthenticated, userType, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-green-600">
            ZeroSpoil
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 dark:text-white">
            
            Home</Link>
            {userType !== "user" && (
              <Link to="/communities" className="text-gray-700 dark:text-white">Community</Link>
            )}
            {userType === "restaurant" && (
              <Link to="/dashboard" className="text-gray-700 dark:text-white">Dashboard</Link>
            )}
            {userType !== "admin" && (
              <Link to="/" className="text-gray-700 dark:text-white">   </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {!isAuthenticated ? (
              <button onClick={() => openModal("login")} className="text-gray-700 dark:text-white">Login / Signup</button>
            ) : (
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 dark:text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal 
          type={modalType} 
          closeModal={closeModal} 
          setIsAuthenticated={setIsAuthenticated} 
          navigate={navigate}
        />
      )}
    </nav>
  );
};

export default Navbar;