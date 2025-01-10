import { Link } from "react-router-dom";
import { useServiceContext } from "../../context/Context";

const ServiceCard = ({ service, index }) => {
  const { theme } = useServiceContext();

  //console.log(theme);

  return (
    <div
      className="container mx-auto px-4 py-4"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Service Cards */}

      <div
        className={`
            ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-300"}
            shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300`}
        data-aos="fade-up"
      >
        {/* Service Image */}
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-48 lg:h-[25vh] object-cover"
        />

        <div className="p-6">
          {/* Service Name */}
          <h3 className="text-2xl dark:text-gray-200 font-bold text-gray-800">
            {service.serviceName.slice(0, 20) + "..."}
          </h3>

          {/* Service Description */}
          <p className="text-gray-600 dark:text-gray-300  text-sm mt-2">
            {service.description.slice(0, 30) + "..."}
            <Link
              to={`/services/${service._id}`}
              className="hover:underline font-semibold text-blue-600 "
            >
              See Details
            </Link>
          </p>

          {/* Service Price */}
          <p className="mt-4 dark:text-gray-200  text-lg font-semibold text-gray-800">
            ServiceCharge: ${service.price}
          </p>
        </div>

        {/* Provider Info Section */}
        <div
          className="p-6 pt-2
         border-t flex justify-between items-center border-gray-200"
        >
          {/* Provider Title */}
          <h4 className="text-lg dark:text-gray-200  font-semibold text-gray-700 my-2">
            Provider:
          </h4>

          {/* Provider Image and Name */}
          <div className="flex items-center">
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
      </div>
    </div>
  );
};

export default ServiceCard;
