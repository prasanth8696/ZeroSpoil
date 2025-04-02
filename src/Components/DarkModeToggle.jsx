import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
      {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-900 dark:text-gray-100" />}
    </button>
  );
};

export default DarkModeToggle;