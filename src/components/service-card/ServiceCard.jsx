import { Link } from "react-router-dom";

const services = [
  {
    image: "https://source.unsplash.com/200x200/?home,repair",
    name: "Plumbing Repair",
    description:
      "Get fast plumbing solutions to fix leaks and pipes in your home. Don't wait, call us today!",
    providerImage: "https://source.unsplash.com/50x50/?person",
    providerName: "John Doe",
    price: "$100",
    detailsLink: "/service-detail/1",
  },
  {
    image: "https://source.unsplash.com/200x200/?construction,tools",
    name: "Electrical Installation",
    description:
      "Safe and secure electrical installations for your home and office. Call for a consultation.",
    providerImage: "https://source.unsplash.com/50x50/?person",
    providerName: "Jane Smith",
    price: "$150",
    detailsLink: "/service-detail/2",
  },
  {
    image: "https://source.unsplash.com/200x200/?cleaning,service",
    name: "Home Cleaning",
    description:
      "Thorough and professional home cleaning services to make your home sparkling clean.",
    providerImage: "https://source.unsplash.com/50x50/?person",
    providerName: "Alice Johnson",
    price: "$80",
    detailsLink: "/service-detail/3",
  },
  {
    image: "https://source.unsplash.com/200x200/?plumbing,repair",
    name: "Roof Repair",
    description:
      "Get your roof repaired quickly and efficiently to prevent leaks and water damage.",
    providerImage: "https://source.unsplash.com/50x50/?person",
    providerName: "Mark Evans",
    price: "$120",
    detailsLink: "/service-detail/4",
  },
];

const ServiceCard = ({ service }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Service Cards */}

      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
        data-aos="fade-up"
      >
        {/* Service Image */}
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-48 lg:h-[40vh] object-cover"
        />

        <div className="p-6">
          {/* Service Name */}
          <h3 className="text-2xl font-bold text-gray-800">
            {service.serviceName}
          </h3>

          {/* Service Description */}
          <p className="text-gray-600 text-sm mt-2">
            {service.description.slice(0, 100)}
            {service.description.length > 100 ? "..." : ""}
          </p>

          {/* Service Price */}
          <p className="mt-4 text-lg font-semibold text-gray-800">
            ServiceCharge: ${service.price}
          </p>
        </div>

        {/* Provider Info Section */}
        <div className="p-6 pt-0 border-t border-gray-200">
          {/* Provider Title */}
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Provider</h4>

          {/* Provider Image and Name */}
          <div className="flex items-center">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {service.providerName}
              </p>
            </div>
          </div>
        </div>

        {/* View Details Button - Positioned at the Bottom Right */}
        <div className="absolute bottom-6 right-6">
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
