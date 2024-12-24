import { useState } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useServiceContext } from "../context/Context";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BookingForm from "../components/form/BookingForm";
import swal from "sweetalert";

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
      .post("https://backend-phi-taupe.vercel.app/book-service", formData)
      .then((res) => {
        swal("Good job!", "You have booked one service!", "success");
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
        className="container mx-auto px-4 py-12 border shadow-md m-3 rounded-md border-gray-400 mb-20"
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
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {service.providerName}
                </p>
                <p className="text-sm text-gray-500 flex items-center dark:text-gray-300">
                  <FaMapMarkerAlt className="text-red-500 mr-2 dark:text-gray-200" />{" "}
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
            <h1 className="text-3xl dark:text-gray-200 font-bold text-gray-800 mb-4">
              {service.serviceName}
            </h1>

            {/* Service Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {service.description}
            </p>

            {/* Service Price */}
            <p className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-200 ">
              Price: ${service.price}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center mb-6">
                <img
                  src={service.providerImage}
                  alt={service.providerName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
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
          <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        )}
      </div>

      {/* Modal for Booking Form */}
      {showModal && (
        <BookingForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ServiceDetails;
