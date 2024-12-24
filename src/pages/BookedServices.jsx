import { useEffect, useState } from "react";
import { useServiceContext } from "../context/Context";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/loader/Loading";

const BookedServices = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const { user, loading } = useServiceContext();
  const [loader, setLoader] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoader(true);
    if (user?.email) {
      axiosSecure
        .get(`/booked-services?email=${user?.email}`)
        .then((res) => {
          setBookedServices(res.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setLoader(false);
        });
    }
  }, [user?.email]);

  if (loader || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mb-12 py-4">
      <Helmet>
        <title>BookedServices || Home Repair</title>
      </Helmet>
      <div className="relative w-full h-72 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Rotating Decorative Elements */}
        <div className="absolute w-96 h-96 bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 opacity-20 rounded-full animate-spin-slow"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-br from-purple-300 via-indigo-400 to-blue-500 opacity-20 rounded-full animate-spin-reverse-slow"></div>

        {/* Main Text */}
        <h1 className="relative text-4xl md:text-6xl font-extrabold text-center text-white tracking-wider leading-tight">
          <span className="block text-yellow-300">Your Trusted Hub</span>
          <span className="block text-indigo-300 mt-2">
            For Booked Services
          </span>
        </h1>

        {/* Subtext */}
        <p className="relative text-lg md:text-xl font-medium text-center text-gray-200 mt-4">
          Connecting you to seamless solutions and reliable service providers.
        </p>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50"></div>
      </div>

      <h2 className="text-3xl py-12 font-bold text-center mb-8">
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
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedServices.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 dark:bg-gray-800"
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
                    <p className="text-gray-500 font-semibold dark:text-gray-300">
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
                  <span className="text-gray-600 font-semibold dark:text-gray-300">
                    Price: <strong>${service.price}</strong>
                  </span>
                </div>

                {/* Booking Info */}
                <div className="mt-2 text-gray-700 dark:text-gray-200">
                  <p>
                    <strong>Booked Date:</strong> {service.serviceDate}
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
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
