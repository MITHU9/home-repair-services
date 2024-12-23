import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiHome,
  FiLogIn,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useServiceContext } from "../../context/Context";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, signOutUser, toggleTheme, theme } = useServiceContext();

  const handleSignout = () => {
    signOutUser();
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <nav className="bg-gray-800 fixed z-50 top-0 right-0 left-0 text-white shadow-lg py-2">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Website Logo and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo2.jpg" // Replace with your logo
            alt="Logo"
            className="w-8 h-8 mt-1.5 rounded-full"
          />
          <span className="text-xl font-bold">Home Repair</span>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="flex items-center space-x-2 lg:hidden">
          {user && (
            <div className="flex items-center space-x-2">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span>{user?.displayName || "User"}</span>
            </div>
          )}
          <button
            className="lg:hidden text-xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <button
            onClick={toggleTheme}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Full Menu (Hidden on Small Screens) */}
        <div
          className={`hidden lg:flex items-center space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          {/* Common Links */}
          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-gray-300"
          >
            <FiHome />
            <span>Home</span>
          </Link>
          <Link
            to="/all-services"
            className="flex items-center space-x-1 hover:text-gray-300"
          >
            <FiUser />
            <span>Services</span>
          </Link>
          {!user && (
            <button
              onClick={toggleTheme}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          )}

          {user ? (
            <>
              {/* Dashboard Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-1 hover:text-gray-300"
                >
                  <span>Dashboard</span>
                  <FiChevronDown />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10 dark:bg-gray-700 dark:text-gray-200 ">
                    <Link
                      to="/add-service"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Add Service
                    </Link>
                    <Link
                      to="/manage-services"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Manage Service
                    </Link>
                    <Link
                      to="/booked-services"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Booked Services
                    </Link>
                    <Link
                      to="/service-to-do"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Service To-Do
                    </Link>
                  </div>
                )}
              </div>

              {/* User Profile and Logout */}
              <div className="flex items-center space-x-2">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.displayName || "User"}</span>
                <button
                  onClick={handleSignout}
                  className="flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </>
          ) : (
            // Non-Logged-in Menu
            <NavLink
              to="/auth/login"
              className="flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded"
            >
              <FiLogIn />
              <span>Log-in</span>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex items-center justify-center bg-gray-800 text-white">
          <div className="space-y-4 px-4 py-2">
            <Link to="/" className="block hover:text-gray-300">
              Home
            </Link>
            <Link to="/all-services" className="block hover:text-gray-300">
              Services
            </Link>
            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center w-full text-left hover:text-gray-300"
                >
                  Dashboard
                  <FiChevronDown className="mt-1" />
                </button>
                {showDropdown && (
                  <div className="ml-4 space-y-2">
                    <Link
                      to="/add-service"
                      className="block hover:text-gray-300"
                    >
                      Add Service
                    </Link>
                    <Link
                      to="/manage-services"
                      className="block hover:text-gray-300"
                    >
                      Manage Service
                    </Link>
                    <Link
                      to="/booked-services"
                      className="block hover:text-gray-300"
                    >
                      Booked Services
                    </Link>
                    <Link
                      to="/service-to-do"
                      className="block hover:text-gray-300"
                    >
                      Service To-Do
                    </Link>
                  </div>
                )}
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={handleSignout}
                    className="flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                className="block hover:text-gray-300 border py-1 border-gray-500 px-2 rounded"
              >
                Log-in
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
