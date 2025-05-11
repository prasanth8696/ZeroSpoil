import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
=======
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa";
>>>>>>> 74d09c4 (Initial commit)
import Modal from "./Modal";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ isAuthenticated, userType, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
<<<<<<< HEAD
=======
  const [profileOpen, setProfileOpen] = useState(false);
>>>>>>> 74d09c4 (Initial commit)
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
<<<<<<< HEAD
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
=======
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 relative z-50">
>>>>>>> 74d09c4 (Initial commit)
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-green-600">
            ZeroSpoil
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 dark:text-white">Home</Link>
            {userType !== "user" && (
              <Link to="/communities" className="text-gray-700 dark:text-white">Community</Link>
            )}
            {userType === "restaurant" && (
              <Link to="/dashboard" className="text-gray-700 dark:text-white">Dashboard</Link>
            )}
          </div>

<<<<<<< HEAD
          <div className="flex items-center space-x-4">
  {isAuthenticated && userType === "user" && (
    <Link to="/cart" className="text-gray-700 dark:text-white">
      <FaShoppingCart size={22} />
    </Link>
  )}

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
=======
          <div className="flex items-center space-x-4 relative">
            {isAuthenticated && userType === "user" && (
              <Link to="/cart" className="text-gray-700 dark:text-white">
                <FaShoppingCart size={22} />
              </Link>
            )}

            <DarkModeToggle />

            {!isAuthenticated ? (
              <button onClick={() => openModal("login")} className="text-gray-700 dark:text-white">
                Login / Signup
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="text-gray-700 dark:text-white focus:outline-none"
                >
                  <FaUserCircle size={24} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    {userType === "restaurant" && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 dark:text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
>>>>>>> 74d09c4 (Initial commit)
        </div>
      </div>

      {modalOpen && (
<<<<<<< HEAD
        <Modal 
          type={modalType} 
          closeModal={closeModal} 
          setIsAuthenticated={setIsAuthenticated} 
=======
        <Modal
          type={modalType}
          closeModal={closeModal}
          setIsAuthenticated={setIsAuthenticated}
>>>>>>> 74d09c4 (Initial commit)
          navigate={navigate}
        />
      )}
    </nav>
  );
};

export default Navbar;
