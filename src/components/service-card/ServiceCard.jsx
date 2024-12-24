import { Link } from "react-router-dom";
import { useServiceContext } from "../../context/Context";

const ServiceCard = ({ service }) => {
  const { theme } = useServiceContext();

  console.log(theme);

  return (
    <div className="container mx-auto md:px-4 py-12">
      {/* Service Cards */}

      <div
        className={`
            ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-300"}
            shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300 `}
        data-aos="fade-down"
      >
        {/* Service Image */}
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-48 lg:h-[40vh] object-cover"
        />

        <div className="p-6">
          {/* Service Name */}
          <h3 className="text-2xl dark:text-gray-200 font-bold text-gray-800">
            {service.serviceName}
          </h3>

          {/* Service Description */}
          <p className="text-gray-600 dark:text-gray-300  text-sm mt-2">
            {service.description.slice(0, 100) + "..."}
          </p>

          {/* Service Price */}
          <p className="mt-4 dark:text-gray-200  text-lg font-semibold text-gray-800">
            ServiceCharge: ${service.price}
          </p>
        </div>

        {/* Provider Info Section */}
        <div className="p-6 pt-0 border-t border-gray-200">
          {/* Provider Title */}
          <h4 className="text-lg dark:text-gray-200  font-semibold text-gray-700 my-2">
            Provider:
          </h4>

          {/* Provider Image and Name */}
          <div className="flex items-center mb-6">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold dark:text-gray-200  text-gray-800">
                {service.providerName}
              </p>
            </div>
          </div>
        </div>

        {/* View Details Button - Positioned at the Bottom Right */}
        <div className="absolute bottom-2 right-6 pb-2">
          <Link
            to={`/services/${service._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
