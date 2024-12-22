import { useEffect, useState } from "react";
import Banner from "../components/banner/Banner";
import AOS from "aos";
import ServiceCard from "../components/service-card/ServiceCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [popularServices, setPopularServices, theme] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration

    try {
      fetch("http://localhost:5000/popular-services")
        .then((res) => res.json())
        .then((data) => {
          setPopularServices(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          {location.pathname === "/"
            ? "Home Repair"
            : location.pathname.split("/home/")[1]}{" "}
          || Home Repair Services
        </title>
      </Helmet>
      <section>
        <Banner />
      </section>

      {/* 
        <!-- Popular Services Section -->
       */}
      <section className="lg:container mx-auto px-4 py-10">
        <div className="text-center py-8">
          <h2
            className={`
           ${
             theme ? "dark:text-gray-200" : "light:text-gray-600"
           } font-bold text-3xl`}
          >
            Popular Services
          </h2>
          <p
            className={`
           ${
             theme ? "dark:text-gray-200" : "light:text-gray-500"
           } font-semibold text-lg mt-2`}
          >
            Check out some of our most popular services.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {popularServices.map((service) => (
            <div key={service._id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
        {/* Show All Button */}
        <div className="text-center mt-8">
          <Link
            to="/all-services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Show All Services
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
