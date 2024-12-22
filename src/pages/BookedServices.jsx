import { useEffect, useState } from "react";
import { useServiceContext } from "../context/Context";

const BookedServices = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const { user, loading } = useServiceContext();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/booked-services/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookedServices(data);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Your Booked Services
      </h2>

      {bookedServices.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center h-[60vh] text-gray-500 text-lg mt-10"
          data-aos="fade-up"
        >
          <p className="text-3xl font-bold">No services found.</p>
          <p className="mt-2 font-semibold">
            It looks like you haven’t booked any services yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedServices.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
              data-aos="fade-up"
            >
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {service.serviceName}
                    </h3>
                    <p className="text-gray-500 font-semibold">
                      {service.providerName}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-white text-xs font-semibold ${
                        service.serviceStatus === "Pending"
                          ? "bg-yellow-500"
                          : service.serviceStatus === "Completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {service.serviceStatus}
                    </span>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600 font-semibold">
                    Price: <strong>${service.price}</strong>
                  </span>
                </div>

                {/* Booking Info */}
                <div className="mt-2 text-gray-700">
                  <p>
                    <strong>Booked Date:</strong> {service.serviceDate}
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    <strong>Provider Email:</strong> {service.providerEmail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default BookedServices;
