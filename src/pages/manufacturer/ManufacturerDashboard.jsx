import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function ManufacturerDashboard() {
  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <Sidebar role="manufacturer" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar userRole="Manufacturer" />

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Welcome back, Manufacturer 👋
          </h2>
          <p className="text-gray-400">Here's your dashboard overview.</p>
          {/* You can add summary cards or stats here later */}
        </main>
      </div>
    </div>
  );
}

export default ManufacturerDashboard;
