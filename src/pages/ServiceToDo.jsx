import { useState, useEffect } from "react";

const ServiceToDo = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    // Simulated data for bookings
    const services = [
      {
        serviceName: "Repairing Home",
        serviceImage:
          "https://floridaslargesthomeshow.com/wp-content/uploads/2020/11/Home-sa…",
        providerEmail: "mithu10@gmail.com",
        providerName: "mithu",
        userEmail: "mithu10@gmail.com",
        userName: "mithu",
        price: "200",
        serviceDate: "2024-12-17",
        serviceStatus: "Pending",
        specialInstructions: "hsfg",
      },
    ];

    // Simulate delay
    setTimeout(() => {
      setBookings(services);
      setLoading(false);
    }, 1000);
  };

  const updateStatus = (index, newStatus) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].serviceStatus = newStatus;
    setBookings(updatedBookings);

    // Simulate API call to update the status in the backend
    console.log(
      `Updated service status to ${newStatus} for booking at index ${index}`
    );
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-200 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Booked Services
      </h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-600">
          No booked services available.
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 "
            >
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-40 object-cover rounded-lg mb-4"
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
                  id={`status-${index}`}
                  value={booking.serviceStatus}
                  onChange={(e) => updateStatus(index, e.target.value)}
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
