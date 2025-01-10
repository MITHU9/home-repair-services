import React from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa"; // Import React Icons

const Footer = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Name */}
        <div className="flex flex-col items-start" data-aos="fade-down">
          <img
            src="/logo2.jpg" // Replace with your logo
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="text-xl font-bold">Home Repair Services</h2>
          <p className="text-sm mt-2">
            Reliable, professional, and efficient home repair services to keep
            your home in top shape.
          </p>
        </div>

        {/* Social Media Links */}
        <div
          className="flex flex-col items-start"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-6">
            {/* Facebook Icon */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            {/* YouTube Icon */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaYoutube size={24} />
            </a>
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-sm mt-4">
            Follow us for updates, tips, and exclusive offers!
          </p>
        </div>

        {/* Contact Information */}
        <div
          className="flex flex-col items-start"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@homerepairapp.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm mt-4">
            Address: 123 Home Repair Lane, Suite 456, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Home Repair Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
