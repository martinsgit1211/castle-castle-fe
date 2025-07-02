import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const AboutContact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_e028x4q",
        "template_ic4to55",
        templateParams,
        "n6yp0XxF3h9CUUxL7"
      )
      .then(() => {
        setSuccess(true);
        setSending(false);
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setSending(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] text-gray-800 px-4 py-10 md:px-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* About Us */}
        <div className="flex-1 lg:px-2 md:px-10">
          <h1 className="text-[2em] text-center md:text-3xl font-bold mb-6 text-yellow-600">
            About <span className="text-gray-800">Castle</span><span className="text-yellow-600">&Castle</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Castle&Castle is your trusted partner in real estate. We provide a seamless platform where property owners can list homes, apartments, land, and commercial spaces, and prospective buyers or renters can explore and connect easily.
            <br /><br />
            Our platform is designed to eliminate middlemen and confusion, empowering both sellers and seekers with direct access to property information, clear visuals, and real-time updates.
            <br /><br />
            Whether you're looking to sell a family home or rent a city apartment, Castle&Castle brings transparency, efficiency, and trust to every transaction.
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">What Drives Us</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Simplifying property transactions</li>
              <li>Creating visibility for homeowners and agents</li>
              <li>Enabling smarter decisions through verified listings</li>
              <li>Building communities through better real estate access</li>
            </ul>
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex-1 relative bg-white bg-opacity-80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg">
          <div className="relative z-10 p-5 md:p-10">
            <h1 className="text-3xl text-center md:text-4xl font-bold mb-6 text-yellow-600">Contact Us</h1>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Do you have a property to list, a partnership inquiry, or just a question? Reach out — our team is ready to support your real estate journey.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="px-4 py-2 rounded bg-white text-gray-800 border border-yellow-600 placeholder-gray-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded bg-white text-gray-800 border border-yellow-500 placeholder-gray-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="px-4 py-2 rounded bg-white text-gray-800 border border-yellow-500 placeholder-gray-500 h-20"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded transition"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                >
                  <motion.div
                    className="bg-white rounded-xl p-8 flex flex-col items-center text-green-600"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <CheckCircle size={64} className="mb-4 text-green-500" />
                    <p className="text-xl font-semibold">Message Sent Successfully!</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContact;
