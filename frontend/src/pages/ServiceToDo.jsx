import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useServiceContext } from "../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../components/loader/Loading";

const ServiceToDo = () => {
  const [bookings, setBookings] = useState([]);
  const [loader, setLoader] = useState(true);
  const [flag, setFlag] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useServiceContext();

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
    setLoader(true);
    try {
      await axiosSecure
        .get(`/service-to-do?email=${user?.email}`)
        .then((res) => {
          setBookings(res.data);
          setLoader(false);
        });
    } catch (error) {
      console.error("Error fetching bookings: ", error);
      setLoader(false);
    }
  };

  const updateStatus = (serviceId, newStatus) => {
    setLoader(true);
    axiosSecure
      .patch(`/update-status/${serviceId}`, {
        updatedStatus: newStatus,
      })
      .then((res) => {
        console.log(res.data);
        setFlag(!flag);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error updating status: ", error);
        setLoader(false);
      });
  };

  if (loader || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <Loading />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-200 min-h-screen py-4 pb-16">
      {/* Banner Section */}
      <div className="relative w-full h-72 bg-gradient-to-r from-green-800 via-gray-900 to-blue-900 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
        <h1 className="relative text-4xl md:text-6xl font-extrabold text-center text-white tracking-wider leading-tight">
          <span className="block text-yellow-300">Your Services</span>
          <span className="block text-blue-300 mt-2">Booked by Customers</span>
        </h1>
        <p className="relative text-lg md:text-xl font-medium text-center text-gray-200 mt-4">
          Track, manage, and grow your bookings effortlessly.
        </p>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50"></div>
      </div>

      {/* Table Header */}
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
        <div className="overflow-x-auto container mx-auto px-4">
          {/* Booking Table */}
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Service Image</th>
                <th className="py-3 px-4 text-left">Service Name</th>
                <th className="py-3 px-4 text-left">Instruction</th>
                <th className="py-3 px-4 text-left">Booked By</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Booking Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 dark:border-gray-600"
                >
                  <td className="py-3 px-4">
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4">{booking.serviceName}</td>
                  <td className="py-3 px-4">
                    {booking.specialInstructions
                      ? booking.specialInstructions.slice(0, 20) + "..."
                      : "No instructions provided."}
                  </td>
                  <td className="py-3 px-4">{booking.userName}</td>
                  <td className="py-3 px-4">${booking.price}</td>
                  <td className="py-3 px-4">{booking.serviceDate}</td>
                  <td className="py-3 px-4">{booking.serviceStatus}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <select
                        defaultValue={booking.serviceStatus}
                        onChange={(e) =>
                          updateStatus(booking._id, e.target.value)
                        }
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-gray-300 dark:bg-gray-700"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Working">Working</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceToDo;
