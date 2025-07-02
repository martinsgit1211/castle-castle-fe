import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusStyles = {
    Pending: "bg-yellow-300 text-gray-800",
    Shipped: "bg-blue-400 text-white",
    Delivered: "bg-green-400 text-white",
    Cancelled: "bg-red-400 text-white",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("wholesalerToken");
        const res = await axios.get("http://localhost:5000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDD0] via-[#F3F4F6] to-[#B3EBF2] text-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have not made any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-yellow-600 text-lg">
                    Order #{order._id.slice(-5)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${statusStyles[order.status] || "bg-gray-400 text-white"}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-row gap-4 justify-between items-center">
                <div className="text-sm text-gray-700">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.product?.name || "Unknown"} x {item.quantity}
                      {item.product?.price && (
                        <span className="ml-2 text-gray-500">
                          (₦{item.product.price})
                        </span>
                      )}
                    </p>
                  ))}
                </div>
                <div className="text-right font-semibold text-gray-800">
                  Total: ₦{order.total.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
