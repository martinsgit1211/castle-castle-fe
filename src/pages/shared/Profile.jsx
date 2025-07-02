import { UserRoundPen } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import axios from "axios";

function Profile() {
  const { logout, user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem(`${user.role.toLowerCase()}Token`);
      await axios.delete("/api/auth/delete", {
        headers: { Authorization: `Bearer ${token}` }
      });
      logout(); // logout and redirect if needed
    } catch (err) {
      console.error("Delete failed:", err.response?.data?.message || err.message);
      alert("Could not delete account. Try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] text-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <UserRoundPen size={36} className="text-yellow-400" />
          <h1 className="text-2xl font-bold ml-3">{user.name}'s Profile</h1>
        </div>

        {/* Info Section */}
        <div className="space-y-2 text-sm sm:text-base">
          <p>
            <strong className="text-yellow-400">Role:</strong> {user.role}
          </p>
          <p>
            <strong className="text-yellow-400">
              {user.role === "Manufacturer" ? "Company Name" : "Business Name"}:
            </strong>{" "}
            {user.name}
          </p>
          <p>
            <strong className="text-yellow-400">Email:</strong> {user.email}
          </p>
          {user.role === "Wholesaler" && (
            <p>
              <strong className="text-yellow-400">Business Type:</strong> {user.businessType}
            </p>
          )}
        </div>

        {/* Delete Button */}
        <div className="border-t border-gray-700 mt-6 pt-5 flex justify-center">
          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded"
          >
            <UserRoundPen size={18} />
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
