import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function ManufacturerDashboard() {
  const [companyName, setCompanyName] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("manufacturerUser"));

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("manufacturerToken");
        const res = await axios.get("http://localhost:5000/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error.message);
        setMessage("Failed to fetch notifications. Please try again later.");
      }
    };

    const fetchProductCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("manufacturerToken")}`,
          },
        });
        setProductCount(res.data.count);
      } catch (err) {
        console.error("Error fetching product count:", err.response?.data?.message || err.message);
      }
    };

    if (userData?.companyName) {
      setCompanyName(userData.companyName);
    }

    fetchNotifications();
    fetchProductCount();
  }, []);

  return (
    <div className="min-h-screen md:pl-65 flex bg-[#C6DBEF] text-gray-800">
      {/* Sidebar */}
      <Sidebar role="Manufacturer" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar userRole="Manufacturer" />

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, <span className="text-yellow-500">{companyName}</span> 👋
          </h2>
          <p className="text-sm text-gray-600 mb-6">Here's your dashboard overview.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* Total Products */}
            <Link
              to="/manufacturer/products"
              className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] hover:shadow-xl p-6 rounded-xl transition"
            >
              <h3 className="text-lg text-yellow-500 font-semibold">Total Products</h3>
              <p className="text-sm text-gray-700">Number of products listed</p>
              <h4 className="text-2xl font-bold mt-3">{productCount}</h4>
            </Link>

            {/* Orders Pending */}
            <Link
              to="/manufacturer/orders"
              className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] hover:shadow-xl p-6 rounded-xl transition"
            >
              <h3 className="text-lg text-yellow-500 font-semibold">Orders Pending</h3>
              <p className="text-sm text-gray-700">Orders awaiting confirmation</p>
            </Link>

            {/* Total Sales */}
            <div className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] p-6 rounded-xl shadow transition">
              <h3 className="text-lg text-yellow-500 font-semibold">Total Sales</h3>
              <p className="text-sm text-gray-700">Total sales made so far</p>
            </div>

            {/* Notifications */}
            <div className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] p-6 rounded-xl shadow transition">
              <h3 className="text-lg text-gray-800 font-semibold mb-2">Recent Notifications</h3>
              {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

              {notifications.length === 0 ? (
                <Link to="/manufacturer/notifications">
                  <p className="text-gray-700">No notifications yet.</p>
                </Link>
              ) : (
                <Link to="/manufacturer/notifications" className="block mt-2">
                  <p className="text-yellow-600 font-semibold mb-2">
                    🔔 You've got notifications!
                  </p>
                  <ul className="space-y-1">
                    {notifications.map((note) => (
                      <li key={note._id} className="text-sm text-gray-700">
                        {note.message}
                      </li>
                    ))}
                  </ul>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManufacturerDashboard;
