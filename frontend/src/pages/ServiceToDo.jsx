import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useServiceContext } from "../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";

const ServiceToDo = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useServiceContext();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [flag]);

  const fetchBookings = async () => {
    try {
      await axiosSecure
        .get(`/service-to-do?email=${user?.email}`)
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching bookings: ", error);
      setLoading(false);
    }
  };

  const updateStatus = (serviceId, newStatus) => {
    axiosSecure
      .patch(`/update-status/${serviceId}`, {
        updatedStatus: newStatus,
      })
      .then((res) => {
        console.log(res.data);
        setFlag(!flag);
      });
  };

  // console.log(bookings.price);
  // console.log(bookings);

  return (
    <div className="dark:bg-gray-900 bg-gray-200 min-h-screen py-4 pb-16">
      <div className="relative w-full h-72 bg-gradient-to-r from-green-800 via-gray-900 to-blue-900 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Rotating Decorative Elements */}
        <div className="absolute w-96 h-96 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 opacity-20 rounded-full animate-spin-slow"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-br from-teal-300 via-green-400 to-blue-500 opacity-20 rounded-full "></div>

        <h1 className="relative text-4xl md:text-6xl font-extrabold text-center text-white tracking-wider leading-tight">
          <span className="block text-yellow-300">Your Services</span>
          <span className="block text-blue-300 mt-2">Booked by Customers</span>
        </h1>

        <p className="relative text-lg md:text-xl font-medium text-center text-gray-200 mt-4">
          Track, manage, and grow your bookings effortlessly.
        </p>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50"></div>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-10 mt-8 py-12 text-gray-800 dark:text-gray-100">
        Manage Your Provided Services Below
      </h1>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-600">
          No booked services available.
        </div>
      ) : (
        <div className="grid container mx-auto gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 "
              data-aos="fade-up"
              data-aos-delay={index * 100} // Delay animation based on index
            >
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                {booking.serviceName}
              </h2>
              <p className="text-gray-600 dark:text-gray-200">
                Provider: {booking.providerName}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                BookedBy: {booking.userName}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                Price: ${booking.price}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                BookingDate: {booking.serviceDate}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                Status: {booking.serviceStatus}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                Instructions: {booking.specialInstructions}
              </p>

              <div className="mt-4">
                <label
                  htmlFor={`status-${index}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Update Status
                </label>
                <select
                  defaultValue={booking.serviceStatus}
                  onChange={(e) => updateStatus(booking._id, e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-gray-300 dark:bg-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Working">Working</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceToDo;
