import { Helmet } from "react-helmet-async";
import { useServiceContext } from "../context/Context";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";

import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageServices = () => {
  const { user, loading } = useServiceContext();
  const [services, setServices] = useState([]);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (serviceId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this service file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/delete-service/${serviceId}`);
        swal("Poof! Your Service file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Service file is safe!");
      }
    });
  };

  useEffect(() => {
    if (user?.email) {
      // axios
      //   .get(`http://localhost:5000/my-services?email=${user?.email}`, {
      //     withCredentials: true,
      //   })
      //   .then((res) => {
      //     setServices(res.data);
      //   });

      axiosSecure.get(`/my-services?email=${user?.email}`).then((res) => {
        setServices(res.data);
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
    <div className="pb-12">
      <Helmet>
        <title>ManageServices || Home Repair</title>
      </Helmet>
      {/* Banner */}
      <div
        className="bg-gradient-to-r from-green-600 via-transparent/50 to-gray-500 text-white text-center py-12 relative"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Manage Your Services</h1>
          <p className="mt-2 text-lg">
            View, update, or delete your services easily.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div
        className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between dark:bg-gray-700"
              data-aos="fade-up"
            >
              <img
                src={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-40 lg:h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2 dark:text-gray-200">
                {service.serviceName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {service.description}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-200">
                ServiceCharge: ${service.price}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/update-service/${service._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] w-full text-gray-500 text-lg mt-10 col-span-3">
            <h2 className="text-3xl font-bold text-center text-gray-800 mt-8 dark:text-gray-200">
              No services found.
            </h2>
            <p className="text-center font-semibold text-gray-600 dark:text-gray-300">
              It looks like you haven`t added any services yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
