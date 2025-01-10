import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import { useServiceContext } from "../context/Context";

const About = () => {
  const { theme } = useServiceContext();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [theme]);

  //console.log(theme);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-200 text-gray-800"
      } min-h-screen transition-all `}
    >
      <div className="flex justify-center items-center p-6">
        <h1 className="text-3xl font-bold pt-6">About Us</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <p data-aos="fade-right" className="leading-relaxed mb-6">
          Welcome to <span className="font-semibold">HomeFix Pro</span>, a
          trusted partner for all your home repair needs. Our experienced team
          provides high-quality services to ensure that your home remains in top
          condition.
        </p>

        <div className="space-y-6">
          <h2 data-aos="fade-left" className="text-2xl font-semibold mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li data-aos="fade-up">
              Expert technicians with years of experience.
            </li>
            <li data-aos="fade-up">
              Affordable pricing and transparent quotes.
            </li>
            <li data-aos="fade-up">
              Quick response times and timely completion of tasks.
            </li>
            <li data-aos="fade-up">
              A wide range of services to cater to your needs.
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 data-aos="fade-left" className="text-2xl font-semibold mb-4">
            Our Core Values
          </h2>
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Reliability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We ensure that our customers can count on us for consistent and
                dependable service.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Integrity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transparency and honesty are at the core of everything we do. We
                believe in delivering clear and honest communication.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our job isn`t complete until you`re fully satisfied with the
                work we`ve done. We strive to exceed expectations every time.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Efficiency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We aim to complete projects in a timely manner while maintaining
                the highest quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
