import { useState, useEffect } from "react";
import ServiceCard from "../components/service-card/ServiceCard";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { useServiceContext } from "../context/Context";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const AllServices = () => {
  const { count } = useLoaderData();
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useServiceContext();
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch services based on query
  const fetchServices = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://backend-phi-taupe.vercel.app/search-services/${searchQuery}`
      );
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  // all services fetch from backend
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://backend-phi-taupe.vercel.app/all-services?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (query.length > 0) {
      fetchServices(query);
    } else {
      setServices(services);
    }
  }, [query.length]);

  //change items per page
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  const handleNext = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  //console.log(pages);

  //console.log(count.count);

  console.log(services);

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
            {services?.length > 0 ? (
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
        <button
          onClick={handlePrevious}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md flex items-center space-x-2"
        >
          <span>&larr;</span>
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`
            ${
              currentPage === page
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
              px-4 py-2 rounded-lg font-semibold  shadow-md`}
          >
            {page}
          </button>
        ))}

        {/* Next Button and Dropdown */}
        <div className="relative flex items-center space-x-2">
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md flex items-center space-x-2"
          >
            <span>Next</span>
            <span>&rarr;</span>
          </button>

          {/* Dropdown */}

          {/* Dropdown Menu */}
          <select
            onChange={handleChange}
            className="w-14 py-1.5 rounded-md border border-gray-300 text-gray-200 dark:text-gray-300 shadow-md focus:outline-none dark:bg-gray-700 dark:border-gray-700"
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
