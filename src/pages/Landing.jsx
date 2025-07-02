import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import illustration from "../assets/imgi_2_imgbin-house-real-estate-computer-file-house-0sGgBkVXAY0XwkBeqkyGCw9Hy-removebg-preview.png";
import background from "../assets/imgi_180_pexels-photo-1546168.jpg";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AboutContact from "../components/AboutContact";

function Landing() {
  const phrases = ["Homeowners", "Buyers", "Landlords", "Renters"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [nextPhraseIndex, setNextPhraseIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setNextPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      {/* Background Image */}
 <div
  className="absolute inset-0 bg-contain bg-cover bg-no-repeat bg-center opacity-20 z-0"
  style={{ backgroundImage: `url(${background})`, backgroundColor: "#ffffff" }} // optional fallback
/>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40 z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        <Nav />

        {/* CTA Section */}
        <div className="text-center max-w-4xl mx-auto mt-10 px-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Connect{" "}
            <span
              className={`text-yellow-500 transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {phrases[currentPhraseIndex]}
            </span>
            <br />
            &{" "}
            <span
              className={`text-yellow-500 transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {phrases[nextPhraseIndex]}
            </span>{" "}
            Seamlessly.
          </h2>
        </div>

        <main className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 py-10 flex-grow overflow-x-hidden">
          {/* Text Section */}
          <div className="max-w-xl mb-10 md:mb-0 text-center md:text-left z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Boost your <span className="text-yellow-400">Business.</span>
              <br />
              Start using our Services today.
            </h2>
            <p className="mt-6 text-gray-300 text-base sm:text-lg">
              A smart marketplace to streamline property listing, connect buyers
              & sellers, and grow your real estate success.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/manufacturer/register"
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-300 transition"
              >
                List a Property
              </Link>
              <Link
                to="/wholesaler/register"
                className="bg-white text-yellow-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Find a Home
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 max-w-md mx-auto z-10">
            <img
              src={illustration}
              alt="Real Estate Illustration"
              className="w-[120%] h-auto object-cover"
            />
          </div>
        </main>

        {/* About & Contact Section */}
        <AboutContact />
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
