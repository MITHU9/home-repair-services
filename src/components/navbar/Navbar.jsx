import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiUser, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { useServiceContext } from "../../context/Context";
import Button from "../buttons/ThemeButton";
import LogoutButton from "../buttons/LogoutButton";
import LoginButton from "../buttons/LoginButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, signOutUser, toggleTheme, theme } = useServiceContext();

  const navbarRef = useRef(null);

  const handleSignout = () => {
    signOutUser();
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="bg-gray-800 fixed z-50 top-0 right-0 left-0 text-white shadow-lg py-2"
    >
      <div className="container mx-auto md:px-4 px-2 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo2.jpg"
            alt="Logo"
            className="w-8 h-8 mt-1.5 rounded-full"
          />
          <span className="text-lg md:text-xl font-bold">Home Repair</span>
        </Link>

        {/* Hamburger Menu for Small Screens */}
        <div className="flex items-center space-x-2 lg:hidden mr-2">
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
          {!user && <Button toggleTheme={toggleTheme} theme={theme} />}

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
                  <div className="absolute right-0 mt-2 w-48 text-gray-900 bg-slate-300 rounded-md shadow-lg z-10 dark:bg-gray-700 dark:text-gray-200 py-2">
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
              <div className="flex items-center space-x-2 ">
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.displayName || "User"}</span>
                <LogoutButton handleSignout={handleSignout} user={user} />
              </div>
              <Button toggleTheme={toggleTheme} theme={theme} />
            </>
          ) : (
            <LoginButton user={user} />
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
                  <LogoutButton handleSignout={handleSignout} user={user} />
                </div>
              </>
            ) : (
              <LoginButton user={user} />
            )}
            <Button toggleTheme={toggleTheme} theme={theme} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
