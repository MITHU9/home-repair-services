import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  //console.log(theme);

  return (
    <>
      {/* Service Info */}
      <div
        className="p-4 dark:bg-gray-800 flex flex-col justify-between flex-grow"
        data-aos="fade-up"
      >
        <div>
          {/* Service Name */}
          <h3
            className="text-2xl dark:text-gray-200 font-bold text-gray-800"
            data-aos="fade-right"
          >
            {service.serviceName}
          </h3>

          {/* Service Description */}
          <p
            className="text-gray-600 dark:text-gray-300 text-sm mt-2"
            data-aos="fade-down"
          >
            {service.description.slice(0, 100) + "..."}
          </p>

          {/* Service Price */}
          <p
            className="my-2 dark:text-gray-200 text-lg font-semibold text-gray-800"
            data-aos="fade-up"
          >
            ServiceCharge: ${service.price}
          </p>
        </div>

        {/* Provider Info Section */}
        <div className="pt-1 border-t border-gray-200">
          {/* Provider Title */}
          <h4 className="text-lg dark:text-gray-200 font-semibold text-gray-700 my-2">
            Provider:
          </h4>

          {/* Provider Image and Name */}
          <div className="flex items-center" data-aos="fade-up">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <p
              className="font-semibold dark:text-gray-200 text-gray-800"
              data-aos="fade-right"
            >
              {service.providerName}
            </p>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div
        className="md:absolute dark:bg-gray-800 md:bottom-4 md:right-6 p-2"
        data-aos="fade-up"
      >
        <Link
          to={`/services/${service._id}`}
          className="bg-blue-600 text-white w-full md:w-auto block px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 text-center"
        >
          View Details
        </Link>
      </div>
    </>
  );
};

export default ServiceCard;
