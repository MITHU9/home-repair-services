import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const FeaturedSection = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Array of home repair services
  const services = [
    {
      title: "Plumbing Services",
      name: "Leak Repair & Installations",
      description:
        "From fixing leaks to installing new fixtures and drains, our plumbing services ensure your water systems run smoothly.",
      imgSrc:
        "https://www.unitedplumbingco.com/wp-content/uploads/sites/35/2023/12/plumbing-LeakDetectionAndRepair-Hero-960x640-1.jpg",
    },
    {
      title: "Electrical Repairs",
      name: "Safe & Efficient Electrical Solutions",
      description:
        "Expert electricians to handle all your electrical repairs, from faulty wiring to lighting installations and safety checks.",
      imgSrc:
        "https://www.alltradesplumbingandconstruction.com/wp-content/uploads/2023/09/residential-electrical-system.jpg",
    },
    {
      title: "Carpentry Work",
      name: "Custom Builds & Repair",
      description:
        "Skilled carpenters for furniture repair, custom woodwork, and installations like doors, windows, and cabinets.",
      imgSrc:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivnCCxALhrxmYCvdxhs7ApD0ZqKmv0aXbQnaiGg3_-kLbfsylZFyycXjdqFx_22_s8KhlX9BXwSnQlC38K5rZlh3iHglQ485jkFrfVZptSo70m35bEVxSpOmIQUG7z5A7zDS06WMDMANcm/s1600/Home+Maintenance+and+Repair.jpg",
    },
    {
      title: "Painting Services",
      name: "Revitalize Your Home",
      description:
        "Professional painting services for interior and exterior walls, plus decorative and custom designs.",
      imgSrc: "https://www.mossbuildinganddesign.com/hubfs/DSC06602.jpg",
    },
    {
      title: "HVAC Maintenance",
      name: "Heating & Cooling Services",
      description:
        "HVAC repair, maintenance, and installation services to keep your home comfortable year-round.",
      imgSrc:
        "https://www.modernhvac.com/wp-content/uploads/2024/04/heating-and-cooling-services-ac-air-conditioning.jpg",
    },
    {
      title: "General Handyman",
      name: "All-in-One Home Repairs",
      description:
        "Offering a wide range of handyman services including repairs, furniture assembly, and outdoor maintenance.",
      imgSrc:
        "https://layouts.diviflash.xyz/construction/wp-content/uploads/sites/17/2024/02/service-5.webp",
    },
  ];

  return (
    <div className="dark:bg-gradient-to-r dark:from-yellow-900 dark:via-blue-900 dark:to-gray-500 py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-r from-gray-200 via-transparent/30 to-gray-300">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
          Featured Services
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          Explore our wide range of home repair services, designed to make your
          life easier. Quality work guaranteed for your comfort and safety.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-gray-800"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <img
                  className="rounded-t-lg object-cover"
                  src={service.imgSrc}
                  alt={service.title}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <h4 className="text-md font-semibold text-blue-600 mb-2">
                  {service.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
