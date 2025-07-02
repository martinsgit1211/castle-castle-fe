import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-gray-800">
      {/* Top Nav Section - Cream */}
      <div className="bg-[#FFFDD0] px-4 sm:px-8 lg:px-16 py-8 border-t border-gray-300">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm mb-6 text-center">
          <a href="#" className="hover:text-black transition">About</a>
          <a href="#" className="hover:text-black transition">Jobs</a>
          <a href="#" className="hover:text-black transition">Accessibility</a>
          <a href="#" className="hover:text-black transition">Partners</a>
        </div>

        {/* Social Icons - Light Purple */}
        <div className=" py-6 rounded-md flex justify-center gap-6 text-xl text-gray-700">
          <a href="#" className="hover:text-black transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-black transition"><FaInstagram /></a>
          <a href="#" className="hover:text-black transition"><FaXTwitter /></a>
          <a href="#" className="hover:text-black transition"><FaGithub /></a>
          <a href="#" className="hover:text-black transition"><FaYoutube /></a>
        </div>
      </div>

      {/* Bottom Copyright Section - Light Blue */}
      <div className="bg-[#CCCCFF] py-4 text-center text-gray-700">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Castle&Castle Properties. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
