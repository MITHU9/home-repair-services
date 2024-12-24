import { useEffect, useState } from "react";
import Banner from "../components/banner/Banner";
import AOS from "aos";
import ServiceCard from "../components/service-card/ServiceCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FeaturedSection from "../components/featured/Featured";
import Subscription from "../components/Subscription";
import Testimonials from "../components/testimonial/Testimonial";
import { useServiceContext } from "../context/Context";
import Loading from "../components/loader/Loading";
import Categories from "../components/category/CategoryList";
import CardImage from "../components/card-image/HomeCardImage";

const Home = () => {
  const [popularServices, setPopularServices, theme] = useState([]);
  const [loader, setLoader] = useState(false);
  const { loading } = useServiceContext();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration

    setLoader(true);

    try {
      fetch("https://backend-phi-taupe.vercel.app/popular-services")
        .then((res) => res.json())
        .then((data) => {
          setPopularServices(data);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }, [theme]);

  if (loader || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {location.pathname === "/"
            ? "Home Repair"
            : location.pathname.split("/home/")[1]}{" "}
          || Home Repair Services
        </title>
      </Helmet>
      <section>
        <Banner />
      </section>

      {/* 
        <!-- Popular Services Section -->
       */}
      <section className="lg:container mx-auto px-4 py-10">
        <div className="text-center py-8">
          <h2
            className={`
           ${
             theme ? "dark:text-gray-200" : "light:text-gray-600"
           } font-bold text-3xl`}
          >
            Popular Services
          </h2>
          <p
            className={`
           ${
             theme ? "dark:text-gray-200" : "light:text-gray-500"
           } font-semibold text-lg mt-2`}
          >
            Check out some of our most popular services.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {popularServices.map((service, index) => (
            <div
              key={service._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="container mx-auto md:px-4 md:py-8">
                <div
                  className={`flex flex-col lg:flex-row ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-300"
                  } shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300`}
                  data-aos="fade-down"
                >
                  {/* Service Image */}
                  <CardImage
                    imageUrl={service.imageUrl}
                    serviceName={service.serviceName}
                  />
                  <ServiceCard service={service} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Show All Button */}
        <div className="text-center mt-8">
          <Link
            to="/all-services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Show All Services
          </Link>
        </div>
      </section>

      <section>
        <Categories />
      </section>

      <section>
        <FeaturedSection />
      </section>
      <section>
        <Subscription />
      </section>
      <section>
        <Testimonials />
      </section>
    </div>
  );
};
export default Home;
