import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from '../../components/Nav';
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

function WholesalerLogin() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Wholesaler | Login";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('http://localhost:5000/api/auth/wholesaler/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem('wholesalerToken', token);
      localStorage.setItem('wholesalerUser', JSON.stringify(user));
      localStorage.setItem("auth", JSON.stringify({ token, user }));
      setUser(user);
      setMessage("Login successful! Redirecting...");

      login("Wholesaler", token);

      setTimeout(() => {
        navigate('/wholesaler/dashboard');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Nav />
      <div className="fixed inset-0 bg-gradient-to-br from-[#FFFDD0] via-[#F3F4F6] to-[#B3EBF2] flex items-center justify-center p-4">
        <div className="rounded-2xl shadow-lg max-w-md w-full">
          <form
            onSubmit={handleLogin}
            className="bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow-xl w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Wholesaler <span className="text-yellow-500">Login</span>
            </h2>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}
            {message && (
              <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
            )}

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

            <div className="mb-5 relative">
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

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 rounded font-semibold transition"
            >
              Login
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/wholesaler/register" className="text-yellow-500 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default WholesalerLogin;
