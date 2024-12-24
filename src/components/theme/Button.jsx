import { FiMoon, FiSun } from "react-icons/fi";

const Button = ({ toggleTheme, theme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative group flex items-center justify-center px-4 py-1 rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white font-semibold shadow-md hover:shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border-2 border-gray-700 hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
    >
      <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-800 to-gray-900 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
      {theme === "dark" ? (
        <div className="flex items-center space-x-3 z-10">
          <FiSun
            size={28}
            className="text-yellow-400 group-hover:text-yellow-300"
          />
          <span className="text-sm">Light Mode</span>
        </div>
      ) : (
        <div className="flex items-center space-x-3 z-10">
          <FiMoon
            size={28}
            className="text-indigo-500 group-hover:text-indigo-400"
          />
          <span className="text-sm">Dark Mode</span>
        </div>
      )}
    </button>
  );
};
export default Button;
