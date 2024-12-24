import { useState } from "react";
import { NavLink } from "react-router-dom";
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
import Button from "../theme/Button";

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
      <div className="container mx-auto md:px-4 px-2 py-3 flex justify-between items-center">
        {/* Website Logo and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo2.jpg" // Replace with your logo
            alt="Logo"
            className="w-8 h-8 mt-1.5 rounded-full"
          />
          <span className="text-lg md:text-xl font-bold">Home Repair</span>
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
            className="lg:hidden text-xl pl-2
             focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Full Menu (Hidden on Small Screens) */}
        <div
          className={`hidden lg:flex items-center space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          {/* Common Links */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-1 hover:text-gray-300 ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            <FiHome />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/all-services"
            className={({ isActive }) =>
              `flex items-center space-x-1 hover:text-gray-300 ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            <FiUser />
            <span>Services</span>
          </NavLink>
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
                    <NavLink
                      to="/add-service"
                      className={({ isActive }) =>
                        `block items-center px-3 py-1 hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Add Service
                    </NavLink>
                    <NavLink
                      to="/manage-services"
                      className={({ isActive }) =>
                        `block items-center px-3 py-1 hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Manage Service
                    </NavLink>
                    <NavLink
                      to="/booked-services"
                      className={({ isActive }) =>
                        `block items-center px-3 py-1 hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Booked Services
                    </NavLink>
                    <NavLink
                      to="/service-to-do"
                      className={({ isActive }) =>
                        `block items-center px-3 py-1 hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Service To-Do
                    </NavLink>
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
                <NavLink
                  onClick={handleSignout}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded ${
                      isActive && !user ? "text-yellow-300" : "text-white"
                    }
                    `
                  }
                >
                  <FiLogOut />
                  <span>Logout</span>
                </NavLink>
              </div>
              <Button toggleTheme={toggleTheme} theme={theme} />
            </>
          ) : (
            // Non-Logged-in Menu
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded ${
                  isActive && !user ? "text-yellow-300" : "text-white"
                }
                `
              }
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` block hover:text-gray-300 ${
                  isActive ? "text-yellow-300" : "text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-services"
              className={({ isActive }) =>
                ` block hover:text-gray-300 ${
                  isActive ? "text-yellow-300" : "text-white"
                }`
              }
            >
              Services
            </NavLink>
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
                    <NavLink
                      to="/add-service"
                      className={({ isActive }) =>
                        ` block hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Add Service
                    </NavLink>
                    <NavLink
                      to="/manage-services"
                      className={({ isActive }) =>
                        ` block hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Manage Service
                    </NavLink>
                    <NavLink
                      to="/booked-services"
                      className={({ isActive }) =>
                        ` block hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Booked Services
                    </NavLink>
                    <NavLink
                      to="/service-to-do"
                      className={({ isActive }) =>
                        ` block hover:text-gray-300 ${
                          isActive ? "text-yellow-300" : "text-white"
                        }`
                      }
                    >
                      Service To-Do
                    </NavLink>
                  </div>
                )}
                <div className="flex items-center space-x-2 mt-4">
                  <NavLink
                    onClick={handleSignout}
                    className={({ isActive }) =>
                      `flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded ${
                        isActive && !user ? "text-yellow-300" : "text-white"
                      }
                      `
                    }
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </NavLink>
                </div>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `flex items-center space-x-1 hover:text-gray-300 border py-1 border-gray-500 px-2 rounded ${
                    isActive && !user ? "text-yellow-300" : "text-white"
                  }
                  `
                }
              >
                Log-in
              </NavLink>
            )}
            <Button toggleTheme={toggleTheme} theme={theme} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
