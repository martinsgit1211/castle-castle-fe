import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-4 sm:px-15 pt-4 bg-gradient-to-r from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] z-50 relative shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="text-[2.2em] sm:text-[2em] md:text-[2.2em] lg:text-[2.2em] font-bold text-gray-800">
          Castle<span className="text-yellow-600">&Castle</span>
        </Link>

        {/* Hamburger menu for mobile & tablets */}
        <button
          className="lg:hidden focus:outline-none text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 text-sm">
          <div className="flex gap-4 border-r pr-10 border-yellow-500">
            <Link to="/wholesaler/login" className="px-4 py-2 border text-gray-800 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition">
              Login (Buyer/Home Seeker)
            </Link>
            <Link
              to="/wholesaler/register"
              className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
            >
              Sign up (Buyer/Home Seeker)
            </Link>
          </div>

          <div className="flex gap-4">
            <Link to="/manufacturer/login" className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition">
              Login (Seller/Agent)
            </Link>
            <Link
              to="/manufacturer/register"
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
            >
              Sign up (Seller/Agent)
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-yellow-400 mt-4 flex flex-col gap-4 items-center text-[1.1em] bg-gradient-to-r from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] pb-6">
          <Link
            to="/wholesaler/login"
            className="px-10 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition mt-4"
          >
            Login (Buyer/Home Seeker)
          </Link>
          <Link
            to="/wholesaler/register"
            className="rounded-lg px-8 py-2 bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            Sign up (Buyer/Home Seeker)
          </Link>
          <Link
            to="/manufacturer/login"
            className="px-10 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition"
          >
            Login (Seller/Agent)
          </Link>
          <Link
            to="/manufacturer/register"
            className="px-8 py-2 bg-yellow-400 text-black hover:bg-yellow-500 hover:text-white rounded-lg transition"
          >
            Sign up (Seller/Agent)
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
