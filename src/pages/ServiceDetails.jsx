import { useState } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useServiceContext } from "../context/Context";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ServiceDetails = () => {
  const { user } = useServiceContext();
  const service = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(service);

  const currentUserName = user?.displayName;
  const currentUserEmail = user?.email;

  // Handle form data change for the booking modal
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      serviceStatus: "Pending",
    });
  };

  // Handle booking form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/book-service", formData) // Endpoint to store the booking info
      .then((res) => {
        alert("Service booked successfully!");
        setShowModal(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error booking service:", error);
      });
  };

  // Open the modal and set the form data
  const openModal = () => {
    if (service) {
      setFormData({
        serviceId: service._id,
        serviceName: service.serviceName,
        serviceImage: service.imageUrl,
        providerEmail: service.providerEmail,
        providerName: service.providerName,
        userEmail: currentUserEmail,
        userName: currentUserName,
        price: service.price,
      });
      setShowModal(true);
    }
  };

  console.log({ ...formData });

  return (
    <div>
      <Helmet>
        <title>ServiceDetails || Home Repair</title>
      </Helmet>
      {/* Service Details Section */}
      <div
        className="container mx-auto px-4 py-12 border shadow-md m-3 rounded-md"
        data-aos="fade-up"
      >
        {service ? (
          <>
            <h2 className="text-2xl font-semibold py-2">Provider Info:</h2>
            {/* Service Provider Info */}
            <div className="flex items-center mb-6">
              <img
                src={service.providerImage}
                alt={service.providerName}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {service.providerName}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />{" "}
                  {service.serviceArea}
                </p>
              </div>
            </div>

            {/* Service Image */}
            <h2 className="text-2xl font-bold py-4">Service Details:</h2>
            <img
              src={service.imageUrl}
              alt={service.serviceName}
              className="w-full h-[50vh] lg:h-[60vh] object-cover rounded-lg mb-4"
            />

            {/* Service Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {service.serviceName}
            </h1>

            {/* Service Description */}
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>

            {/* Service Price */}
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Price: ${service.price}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={service.providerImage}
                  alt={service.providerName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {service.providerName}
                  </p>
                </div>
              </div>
              <div className="fixed bottom-6 right-6">
                <button
                  onClick={openModal}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Modal for Booking Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Book Service
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <span className="font-bold text-2xl">&times;</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service ID, Service Name, and other non-editable fields */}
                <div className="mb-4">
                  <label className="block text-gray-700">Service ID</label>
                  <input
                    type="text"
                    name="serviceId"
                    value={formData.serviceId}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Service Name</label>
                  <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Service Image</label>
                  <input
                    type="text"
                    name="serviceImage"
                    value={formData.serviceImage}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Provider Email</label>
                  <input
                    type="text"
                    name="providerEmail"
                    value={formData.providerEmail}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Provider Name</label>
                  <input
                    type="text"
                    name="providerName"
                    value={formData.providerName}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Current User Email
                  </label>
                  <input
                    type="text"
                    name="userEmail"
                    value={formData.userEmail}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Current User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Service Taking Date
                  </label>
                  <input
                    type="date"
                    name="serviceDate"
                    value={formData.serviceDate}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 border rounded-lg"
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label className="block text-gray-700">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 border rounded-lg"
                    placeholder="Anything like address, area, customized service plan..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    readOnly
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none"
                  />
                </div>
              </div>

              {/* Purchase Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
