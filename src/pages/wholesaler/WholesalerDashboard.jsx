import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function WholesalerDashboard() {
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("manufacturerUser"));
    if (userData && userData.businessName) {
      setBusinessName(userData.businessName);
    }
  }, []);

  return (
    <div className="min-h-screen md:pl-65 flex bg-gradient-to-br from-[#FFFDD0] via-[#F3F4F6] to-[#B3EBF2] text-gray-800">
      {/* Sidebar */}
      <Sidebar role="Wholesaler" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar userRole="Wholesaler" />

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {businessName || "Wholesaler"} 👋
          </h2>
          <p className="text-gray-600">Here's your dashboard overview.</p>

          {/* Example of a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Summary Cards */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-yellow-600">Total Orders</h3>
              <p className="text-gray-500">Number of orders placed</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-yellow-600">Pending Shipments</h3>
              <p className="text-gray-500">Shipments awaiting processing</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-yellow-600">Total Sales</h3>
              <p className="text-gray-500">Total sales made so far</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default WholesalerDashboard;
