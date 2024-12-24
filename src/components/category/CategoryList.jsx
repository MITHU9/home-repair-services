import { useEffect, useState } from "react";
import {
  FaWater,
  FaBolt,
  FaSnowflake,
  FaHammer,
  FaPaintBrush,
  FaRegLightbulb,
  FaRegBuilding,
  FaBroom,
  FaTree,
  FaSearch,
  FaWindowMaximize,
  FaWrench,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaWater />,
    title: "Plumbing",
    description: "Pipe repairs, leaks, faucet installations",
  },
  {
    icon: <FaBolt />,
    title: "Electrical",
    description: "Wiring, circuit breakers, outlet repairs",
  },
  {
    icon: <FaSnowflake />,
    title: "HVAC",
    description: "Air conditioning, heating systems",
  },
  {
    icon: <FaHammer />,
    title: "Carpentry",
    description: "Furniture assembly, door repairs",
  },
  {
    icon: <FaPaintBrush />,
    title: "Painting",
    description: "Interior & exterior painting services",
  },
  {
    icon: <FaRegLightbulb />,
    title: "Appliance Repair",
    description: "Repair refrigerators, ovens, washing machines",
  },
  {
    icon: <FaRegBuilding />,
    title: "Roofing",
    description: "Roof inspections, repairs, and installations",
  },
  {
    icon: <FaBroom />,
    title: "Cleaning Services",
    description: "General cleaning, deep cleaning, and more",
  },
  {
    icon: <FaTree />,
    title: "Landscaping",
    description: "Garden maintenance, lawn care, landscaping",
  },
  {
    icon: <FaSearch />,
    title: "Home Inspections",
    description: "Professional home inspections for your property",
  },
  {
    icon: <FaWindowMaximize />,
    title: "Windows & Doors",
    description: "Installation & repairs for windows and doors",
  },
  {
    icon: <FaWrench />,
    title: "Handyman Services",
    description: "General repairs, maintenance tasks",
  },
];

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 py-10 dark:bg-gray-900 mb-20">
      <hr />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center my-6">
        Home Repair Services
      </h2>
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((category) => (
            <div key={category.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-white p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center text-4xl sm:text-5xl md:text-6xl text-indigo-600 mb-4 flex-col gap-3">
                  {category.icon}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 mx-1 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
