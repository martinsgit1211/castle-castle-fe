import React, { useState, useContext , useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import Nav from '../../components/Nav'
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";


function ManufacturerLogin() {
  useEffect(() => {
      const originalTitle = document.title;
      document.title = "Seller|Login";
      return () => {
        document.title = originalTitle;
      };
    }, []);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("Login as Manufacturer:", { email, password });
    try {
      const res = await axiosInstance.post('http://localhost:5000/api/auth/manufacturer/login', {
        email,
        password,
      });
      
      const { token, user } = res.data;
  
      // Store token and user info
      localStorage.setItem('manufacturerToken', token);
      localStorage.setItem('manufacturerUser', JSON.stringify(user));
      localStorage.setItem("auth", JSON.stringify({ token, user }));
      setUser(user);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate('/manufacturer/dashboard');
      }, 3000); // Redirect after 3 seconds
      // Update the AuthContext with the logged-in user
      // login("Manufacturer", token); // Update the AuthContext with the logged-in user
      login("Manufacturer", token, user);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Nav/>
   <div className="fixed inset-0 bg-[#C6DBEF] bg-opacity-50 flex items-center justify-center p-4">
  <div className="rounded-2xl shadow-lg max-w-md w-full">
    <form
      onSubmit={handleLogin}
      className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] p-5 sm:p-6 md:p-8 rounded-xl shadow-2xl"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
        Seller/Agent <span className="text-yellow-500">Login</span>
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      )}
      {message && (
        <div className="text-green-600 text-center mb-4">{message}</div>
      )}

      <div className="mb-3 sm:mb-4">
        <label className="block mb-1 text-sm sm:text-base text-gray-800">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:border-yellow-400"
          required
        />
      </div>

      <div className="mb-4 sm:mb-5 relative">
        <label className="block mb-1 text-sm sm:text-base text-gray-800">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:border-yellow-400"
          required
        />
        <span
          className="absolute top-11 sm:top-12 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black py-2 sm:py-2.5 md:py-3 rounded hover:bg-yellow-300 font-semibold transition"
      >
        Login
      </button>

      <p className="mt-4 text-center text-sm text-gray-700">
        Don't have an account?{" "}
        <Link
          to="/manufacturer/register"
          className="text-yellow-500 hover:underline"
        >
          Register here
        </Link>
      </p>
    </form>
  </div>
</div>

    </>
  );
}

export default ManufacturerLogin;