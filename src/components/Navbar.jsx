import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaBell, FaCog, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { role, setRole, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="sticky top-0 z-10 
    flex justify-between items-center px-6 py-4 
    bg-white dark:bg-gray-800 
    shadow-sm border-b border-gray-200 dark:border-gray-700
    transition-all duration-300">

      {/*  Search */}
      <input
        type="text"
        placeholder="Search..."
        className="w-1/3 px-4 py-2 rounded-lg 
        bg-gray-100 dark:bg-gray-700 
        text-black dark:text-white 
        outline-none"
      />

      {/*  Right Section */}
      <div className="flex items-center gap-6">

        {/*  Notification */}
        <FaBell className="text-gray-500 cursor-pointer hover:text-black dark:hover:text-white transition" />

        {/*  Settings */}
        <FaCog className="text-gray-500 cursor-pointer hover:text-black dark:hover:text-white transition" />

        {/*  Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
          hover:scale-110 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/*  Avatar */}
        <img
          src="photo.jpg"
          alt="user"
          className="w-9 h-9 rounded-full cursor-pointer"
        />

        {/*  Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded-lg 
          bg-gray-100 dark:bg-gray-700 
          text-black dark:text-white"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

      </div>
    </div>
  );
};

export default Navbar;