import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from '../../components/Nav';
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

function WholesalerRegister() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Wholesaler | SignUp";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/wholesaler/register", {
        name: businessName,
        email,
        password,
        role: "Wholesaler",
      });

      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/wholesaler/login");
      }, 5000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Nav />
      <div className="inset-0 bg-gradient-to-br from-[#FFFDD0] via-[#F3F4F6] to-[#B3EBF2] flex items-center justify-center p-4">
        <div className="rounded-2xl shadow-lg max-w-md w-full">
          <form
            onSubmit={handleRegister}
            className="bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow-xl w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Wholesaler <span className="text-yellow-500">Registration</span>
            </h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm mb-4 text-center">{message}</p>}

            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Business Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select a business type</option>
                <option value="retail">Retail</option>
                <option value="distributor">Distributor</option>
                <option value="importer">Importer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block mb-1 text-sm text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <span
                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="mb-5 relative">
              <label className="block mb-1 text-sm text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <span
                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300 font-semibold transition"
            >
              Register
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/wholesaler/login" className="text-yellow-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default WholesalerRegister;
