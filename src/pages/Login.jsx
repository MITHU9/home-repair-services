import { useEffect, useState } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useServiceContext } from "../context/Context";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signInWithGoogle, signInWithEmail, setLoading, loading } =
    useServiceContext();

  const [error, setError] = useState(null);
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          navigate("/");
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  //console.log(location);

  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmail(email, password)
      .then((res) => {
        if (res.user) {
          navigate(from);
          setLoading(false);
          setError(null);
        } else {
          setError("user not found! Try again");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Log in to your account and continue.
        </p>

        {/* Email and Password Fields */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-3.5 md:top-5 left-3 text-gray-400 text-lg sm:text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-10 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 md:top-5 left-3 text-gray-400 text-lg sm:text-xl" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full px-10 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-4 md:top-5 right-3 text-gray-400 focus:outline-none"
            >
              {passwordVisible ? (
                <FiEyeOff className="text-lg sm:text-xl" />
              ) : (
                <FiEye className="text-lg sm:text-xl" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold transition duration-300 text-sm sm:text-base"
          >
            Log In
          </button>
        </form>

        {/* Google Sign-In */}
        <div className="my-4">
          <p className="text-center text-gray-500 text-sm sm:text-base">or</p>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 py-3 sm:py-4 rounded-lg border border-gray-300 text-gray-800 font-semibold transition duration-300 text-sm sm:text-base"
          >
            <FcGoogle className="text-xl sm:text-2xl mr-2" />
            Sign in with Google
          </button>
        </div>

        {/* Redirect to Registration */}
        <p className="text-center text-gray-600 text-sm sm:text-base">
          Don’t have an account?{" "}
          <NavLink
            to="/auth/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
