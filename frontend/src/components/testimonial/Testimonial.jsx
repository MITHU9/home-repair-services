import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    feedback: "This product changed my life! Highly recommended!",
    image:
      "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "Amazing service and quality. I'm so impressed!",
    image:
      "https://toietmoiphotography.com/wp-content/uploads/2019/02/Calgary-Student-Headshots-1.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    feedback: "A must-have for anyone looking for great results.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5adff290e2ccd16de2410d9d/1674825622549-OHAI833QHC4A52VB1ZGE/Leslie_Andrews_Photo-2945.jpg",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    feedback: "Exceptional experience, top-notch in every way!",
    image:
      "https://img.freepik.com/free-photo/handsome-bearded-elegant-male-eyeglasses-dressed-dark-blue-suit-with-bow-tie-grey-vignette-background_613910-631.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 py-10 dark:bg-gray-900 mb-20">
      <hr />
      <h2 className="text-4xl font-bold text-center mb-4 mt-8">
        Customer Testimonials
      </h2>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
        Our customers love how our home repair service makes life easier!
      </p>
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-white p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 dark:bg-gray-800">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {testimonial.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
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

export default Testimonials;
