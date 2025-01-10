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
        <div className="overflow-x-auto container mx-auto px-4">
          {/* Table Design */}
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Service Image</th>
                <th className="py-3 px-4 text-left">Service Name</th>
                <th className="py-3 px-4 text-left">Provider Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Booked Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Provider Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {bookedServices.map((service) => (
                <tr
                  key={service._id}
                  className="border-b border-gray-200 dark:border-gray-600"
                >
                  <td className="py-3 px-4">
                    <img
                      src={service.serviceImage}
                      alt={service.serviceName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4">{service.serviceName}</td>
                  <td className="py-3 px-4">{service.providerName}</td>
                  <td className="py-3 px-4">${service.price}</td>
                  <td className="py-3 px-4">{service.serviceDate}</td>
                  <td className="py-3 px-4">
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
                  </td>
                  <td className="py-3 px-4">{service.providerEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookedServices;
