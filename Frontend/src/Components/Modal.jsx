import React, { useState, useEffect } from "react";

const Modal = ({ type, closeModal, setIsAuthenticated, navigate, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignupType, setShowSignupType] = useState(false);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    setIsAuthenticated(true);
    closeModal();
    navigate("/profile");
  };

  // Handle Signup Type Selection
  const handleSignupType = (type) => {
    setShowSignupType(false);  // Hide the type selection screen
    navigate(`/signup/${type}`); // Navigate to the selected signup type page
    closeModal();  // Close the modal after navigating
  };

  // Close modal on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  // Disable modal if user is authenticated
  if (isAuthenticated) {
    return null; // Don't show the modal if the user is authenticated
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button onClick={closeModal} className="absolute top-3 right-4 text-gray-500 dark:text-gray-300 text-xl">
          ✕
        </button>

        <h2 className="text-xl font-bold dark:text-white text-center">
          {type === "login" ? "Login" : "Signup"}
        </h2>

        {/* Signup Type Selection (Only Showed When Not Already Selected) */}
        {showSignupType ? (
          <div className="text-center">
            <p className="mb-4">Select your account type:</p>
            <button onClick={() => handleSignupType("restaurant")} className="w-full bg-blue-600 text-white p-2 rounded mb-2">
              Restaurant Sign Up
            </button>
            <button onClick={() => handleSignupType("admin")} className="w-full bg-blue-600 text-white p-2 rounded mb-2">
              Admin Sign Up
            </button>
            <button onClick={() => handleSignupType("user")} className="w-full bg-blue-600 text-white p-2 rounded">
              User Sign Up
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-4 dark:bg-gray-700 dark:text-white"
              autoFocus
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-3 dark:bg-gray-700 dark:text-white"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Login Button */}
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded mt-4 transition">
              Login
            </button>
          </form>
        )}

        {/* Switch to Signup */}
        {!showSignupType && (
          <button onClick={() => setShowSignupType(true)} className="w-full text-blue-500 mt-2 hover:underline">
            Not having an account? Sign Up
          </button>
        )}

      </div>
    </div>
  );
};

export default Modal;
