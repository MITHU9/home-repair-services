import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-black bg-gradient-to-br from-gray-100 via-gray-100 to-white">
        <div
          className="text-center space-y-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h1
            className="text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            data-aos="zoom-in"
          >
            404
          </h1>
          <p
            className="text-2xl font-medium dark:text-gray-300 text-gray-600"
            data-aos="fade-left"
          >
            Oops! The page you`re looking for doesn`t exist.
          </p>
          <p
            className="text-lg text-gray-400"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            Maybe it was moved, or perhaps it`s just hiding from you.
          </p>
          <button
            onClick={handleGoHome}
            className="mt-4 px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300"
            data-aos="flip-up"
          >
            Go Back Home
          </button>
        </div>
        {/* Add some decorative elements */}
        <div
          className="absolute top-16 right-16 h-24 w-24 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-2xl opacity-50"
          data-aos="fade-down-right"
        ></div>
        <div
          className="absolute bottom-20 left-20 h-32 w-32 bg-gradient-to-bl from-blue-500 to-green-500 rounded-full blur-3xl opacity-30"
          data-aos="fade-up-left"
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
