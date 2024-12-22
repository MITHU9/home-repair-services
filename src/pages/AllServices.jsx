import axios from "axios";
import { useState, useEffect } from "react";
import ServiceCard from "../components/service-card/ServiceCard";

const AllServices = () => {
  const [services, setServices] = useState([]);

  // Fetch all services data (simulated or via API)
  useEffect(() => {
    axios
      .get("http://localhost:5000/all-services") // Replace with actual API endpoint
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <div>
      {/* Banner Section with Animated Text */}
      <div className="relative bg-blue-600 text-white py-24 px-4 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/1600x600/?service')",
          }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold animate__animated animate__fadeIn animate__delay-1s">
            Explore Our All Services
          </h1>
          <p className="mt-4 text-xl animate__animated animate__fadeIn animate__delay-2s">
            Providing high-quality home repair and maintenance services.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          All Services
        </h2>

        {/* Service Cards - One Column Layout */}
        <div className="grid grid-cols-1 gap-8">
          {services.map((service) => (
            <div key={service._id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllServices;
