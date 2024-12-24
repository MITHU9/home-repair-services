import { useEffect, useState } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
  FiImage,
} from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useServiceContext } from "../context/Context";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { user } = useServiceContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    signInWithGoogle,
    createUserWithEmail,
    setLoading,
    updateUser,
    loading,
  } = useServiceContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (password.length < 6) {
      setError("Password must be at least 6 characters or long");
      return;
    }
    if (!upperCase.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!lowerCase.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    if (checkbox) {
      createUserWithEmail(email, password, name)
        .then((res) => {
          if (res.user) {
            updateUser({ displayName: name, photoURL: photo })
              .then(() => {
                console.log("User Updated");
              })
              .catch((err) => {
                console.log(err);
              });
            navigate("/");
          } else {
            setError("Registration Failed");
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please accept terms & conditions");
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Register || Home Repair</title>
      </Helmet>
      <div
        className="bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Fill in the details below to get started.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <FiUser className="absolute top-3 md:top-4 left-3 text-gray-400 text-lg sm:text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-10 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FiMail className="absolute top-3.5 md:top-5 left-3 text-gray-400 text-lg sm:text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-10 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>

          {/* Password Field */}
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
              className="absolute top-3.5 md:top-5 right-3 text-gray-400 focus:outline-none"
            >
              {passwordVisible ? (
                <FiEyeOff className="text-lg sm:text-xl" />
              ) : (
                <FiEye className="text-lg sm:text-xl" />
              )}
            </button>
          </div>

          {/* Photo URL Field */}
          <div className="relative pb-2">
            <FiImage className="absolute top-3.5 md:top-5 left-3 text-gray-400 text-lg sm:text-xl" />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="w-full px-10 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>
          <label className="cursor-pointer label justify-start gap-2 ">
            <input
              type="checkbox"
              name="checkbox"
              className="checkbox checkbox-success"
            />
            <span className="label-text ml-1">Accept terms and conditions</span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 rounded-lg font-semibold transition duration-300 text-sm sm:text-base"
          >
            Register
          </button>
          {error && (
            <div className="text-red-600">
              <label>{error}</label>
            </div>
          )}
        </form>

        <div className="my-4">
          <p className="text-center text-gray-500 text-sm sm:text-base">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 py-3 sm:py-4 rounded-lg border border-gray-300 text-gray-800 font-semibold transition duration-300 text-sm sm:text-base"
          >
            <FcGoogle className="text-xl sm:text-2xl mr-2" />
            Sign in with Google
          </button>
        </div>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 text-sm sm:text-base mt-4">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
