import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const UpdateService = () => {
  const [service, setService] = useState();
  const [flag, setFlag] = useState(false);
  const { id } = useParams();
  const formRef = useRef();

  //console.log(service);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = e.target.imageUrl.value;
    const serviceName = e.target.serviceName.value;
    const price = e.target.price.value;
    const serviceArea = e.target.serviceArea.value;
    const description = e.target.description.value;

    try {
      axios
        .put(`http://localhost:5000/update-service/${service._id}`, {
          ...service,
          imageUrl,
          serviceName,
          price,
          serviceArea,
          description,
        })
        .then((res) => {
          if (res.data.modifiedCount === 1) {
            swal({
              title: "Success",
              text: "Service updated successfully",
              icon: "success",
              button: "Aww yiss!",
            });
          }
          setFlag(!flag);
          formRef.current.reset();
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      fetch(`http://localhost:5000/services/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setService(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [flag]);

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Helmet>
        <title>UpdateService || Home Repair</title>
      </Helmet>
      {/* Header Section */}
      <header
        className="bg-cover bg-center bg-no-repeat h-72 flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/Home-repair-1.jpg')",
        }}
        data-aos="fade-down"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative text-center text-white z-10 px-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Update Your Service
          </h1>
          <p className="text-lg font-light">
            Take your home repair business to the next level by keeping your
            service offerings up to date. Highlight new skills, tools, and
            capabilities to stand out.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div
          className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto dark:bg-gray-700"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 dark:text-gray-200">
            Service Information
          </h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-600 dark:text-gray-200"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                defaultValue={service?.imageUrl}
                name="imageUrl"
                placeholder="Enter Service image URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-200 dark:border-none"
                required
              />
            </div>

            {/* Service Name */}
            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-600 dark:text-gray-200"
              >
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                defaultValue={service?.serviceName}
                name="serviceName"
                placeholder="Enter service name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-200 dark:border-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600 dark:text-gray-200"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                defaultValue={service?.price}
                name="price"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-200 dark:border-none"
                required
              />
            </div>

            {/* Service Area */}
            <div>
              <label
                htmlFor="serviceArea"
                className="block text-sm font-medium text-gray-600 dark:text-gray-200"
              >
                Service Area
              </label>
              <input
                type="text"
                id="serviceArea"
                defaultValue={service?.serviceArea}
                name="serviceArea"
                placeholder="Enter service area"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-200 dark:border-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600 dark:text-gray-200"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={service?.description}
                placeholder="Enter description"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-200 dark:border-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Update Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateService;
