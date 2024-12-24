import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Ensure you import the Swiper CSS
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      image:
        "https://www.callcastle.com/assets/img/mp/mp-our-services-mobile.png",
      title: "Top-Notch Home Repairs",
      description: "Expert services to make your house a home.",
    },
    {
      image:
        "https://mycvcreator.com/administrator/postimages/66cae56b528791.65200351.jpg",
      title: "Premium Tools & Equipment",
      description: "Using advanced tools for precise and reliable repairs.",
    },
    {
      image:
        "https://www.mcnplumbing.com.au/wp-content/uploads/2023/11/shutterstock_2106528122.jpg",
      title: "Fast Plumbing Solutions",
      description: "Solving all your plumbing problems, hassle-free.",
    },
  ];

  return (
    <div className="h-[500px] w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]} // Make sure to pass the modules here
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center flex flex-col items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center text-white max-w-2xl">
                <h2 className="text-4xl font-bold">{slide.title}</h2>
                <p className="mt-2 text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
