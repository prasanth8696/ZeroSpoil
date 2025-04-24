import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = ({ setIsAuthenticated, setUserType }) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [UsermobNum, setUsermobNum] = useState("");
  const [email, setEmail] = useState("");
  const handleSignup = () => {
    if (firstName && lastName && (type !== "UserName" || UserName )) {
      setIsAuthenticated(true);
      setUserType(type);
      navigate("/dashboard"); // Redirect restaurant users to dashboard
    }
  };
  
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold dark:text-white text-center">Sign Up as {type}</h2>

        {type === "restaurant" && (
          <input
            type="text"
            placeholder="User Name "
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border rounded mt-3 dark:bg-gray-700 dark:text-white"
          />
        )}
        
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded mt-4 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded mt-3 dark:bg-gray-700 dark:text-white"
        />
        <input
            type="tel"
            placeholder="Mobile number "
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3} "
            onChange={(e) => setUsermobNum(e.target.value)}
            className="w-full p-2 border rounded mt-3 dark:bg-gray-700 dark:text-white"
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-4 dark:bg-gray-700 dark:text-white"
              autoFocus
            />

        <button onClick={handleSignup} className="w-full bg-green-600 text-white p-2 rounded mt-4">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
