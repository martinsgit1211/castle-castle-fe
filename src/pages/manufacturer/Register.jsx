import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/Nav";
import { FiEye, FiEyeOff } from "react-icons/fi";

function ManufacturerRegister() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Seller | Sign Up";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/manufacturer/register", {
        name: companyName,
        email,
        password,
        role: "Manufacturer",
      });

      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/manufacturer/login");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Nav />
      <div className="inset-0 bg-[#C6DBEF] bg-opacity-40 flex items-center justify-center p-4">
        <div className="rounded-2xl shadow-lg max-w-md w-full">
          <form
            onSubmit={handleRegister}
            className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
              Seller/Agent <span className="text-yellow-500">Registration</span>
            </h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm mb-4 text-center">{message}</p>}

            {/* Company Name */}
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-800">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:border-yellow-400"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:border-yellow-400"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block mb-1 text-sm text-gray-800">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:border-yellow-400"
                required
              />
              <span
                className="absolute top-11 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label className="block mb-1 text-sm text-gray-800">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:border-yellow-400"
                required
              />
              <span
                className="absolute top-11 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition"
            >
              Register
            </button>

            {/* Footer Link */}
            <p className="mt-4 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/manufacturer/login" className="text-yellow-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default ManufacturerRegister;
