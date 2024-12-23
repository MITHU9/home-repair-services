import { useState, useEffect } from "react";
import ServiceCard from "../components/service-card/ServiceCard";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { useServiceContext } from "../context/Context";

const AllServices = () => {
  const loaderData = useLoaderData();
  const [services, setServices] = useState(loaderData);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useServiceContext();
  const [count, setCount] = useState(0);

  // Function to fetch services based on query
  const fetchServices = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/search-services/${searchQuery}`
      );
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchServices(query);
      } else {
        setServices(loaderData);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/service-count`)
        .then((res) => res.json())
        .then((data) => {
          setCount(data);
        });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [services]);

  const itemsPerPage = 2;
  const totalPages = Math.ceil(count.count / itemsPerPage);

  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  console.log(pages);

  //console.log(count.count);

  return (
    <div>
      <Helmet>
        <title>AllServices || Home Repair</title>
      </Helmet>
      {/* Banner Section with Animated Text */}
      <div className="relative bg-blue-600 text-white py-24 px-4 text-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.etsystatic.com/34327552/r/il/645a41/4866525152/il_570xN.4866525152_sjze.jpg')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold animate__animated animate__fadeIn animate__delay-1s">
            Explore Our All Services
          </h1>
          <p className="mt-4 text-xl animate__animated animate__fadeIn animate__delay-2s">
            Providing high-quality home repair and maintenance services.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3 pl-10 pr-4 rounded-full text-gray-800 shadow-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-12">
        <h2
          className={`
           ${
             theme === "dark" ? "text-gray-200" : "text-gray-600"
           } font-bold text-3xl mb-8 text-center underline`}
        >
          All Services
        </h2>

        {/* Service Cards - One Column Layout */}
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[35vh]">
                <p className="text-center text-gray-600 mt-8 font-semibold dark:text-gray-200">
                  No services found. Try searching for something else.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="container mx-auto pb-12 flex items-center justify-center space-x-4">
        {/* Previous Button */}
        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md flex items-center space-x-2">
          <span>&larr;</span>
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            {page}
          </button>
        ))}

        {/* Next Button and Dropdown */}
        <div className="relative flex items-center space-x-2">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md flex items-center space-x-2">
            <span>Next</span>
            <span>&rarr;</span>
          </button>

          {/* Dropdown */}

          {/* Dropdown Menu */}
          <select className="w-14 py-1.5 rounded-md border border-gray-300 text-gray-200 dark:text-gray-300 shadow-md focus:outline-none dark:bg-gray-700 dark:border-gray-700">
            <option value="1">5</option>
            <option value="2">4</option>
            <option value="3">3</option>
            <option value="4">8</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
