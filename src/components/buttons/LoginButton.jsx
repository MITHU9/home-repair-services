import { FiLogIn } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const LoginButton = ({ user }) => {
  return (
    <NavLink
      to="/auth/login"
      className={({ isActive }) =>
        `relative flex items-center space-x-2 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
          isActive && !user
            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md"
            : "bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
        }`
      }
    >
      <span className="flex items-center justify-center text-lg">
        <FiLogIn />
      </span>
      <span>Log-in</span>
    </NavLink>
  );
};
export default LoginButton;
