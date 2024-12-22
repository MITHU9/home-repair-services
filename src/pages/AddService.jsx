import React, { useRef } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { useServiceContext } from "../context/Context";
import axios from "axios";

const AddService = () => {
  const { user } = useServiceContext();
  const formRef = useRef();
  const userPhoto = user?.photoURL;
  const userName = user?.displayName;
  const userEmail = user?.email;

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl = e.target.imageUrl.value;
    const serviceName = e.target.serviceName.value;
    const price = e.target.price.value;
    const serviceArea = e.target.serviceArea.value;
    const description = e.target.description.value;

    try {
      axios
        .post("http://localhost:5000/add-service", {
          imageUrl,
          serviceName,
          price,
          serviceArea,
          description,
          providerImage: userPhoto,
          providerName: userName,
          providerEmail: userEmail,
        })
        .then((res) => {
          console.log(res.data);
          formRef.current.reset();
        });
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(userPhoto, userName, userEmail);

  return (
    <div className="bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen">
      {/* Header Section */}
      <header
        className="bg-cover bg-center bg-no-repeat h-64 flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/public/Home-repair-1.jpg')",
        }}
        data-aos="fade-down"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl font-extrabold">Add a New Service</h1>
          <p className="text-lg mt-2">
            Expand your offerings by adding new home repair services.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div
          className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Service Information
          </h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-600"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="Enter Service image URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Service Name */}
            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-600"
              >
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                placeholder="Enter service name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Service Area */}
            <div>
              <label
                htmlFor="serviceArea"
                className="block text-sm font-medium text-gray-600"
              >
                Service Area
              </label>
              <input
                type="text"
                id="serviceArea"
                name="serviceArea"
                placeholder="Enter service area"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter description"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
