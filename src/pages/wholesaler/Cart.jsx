import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    user,
  } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
        }),
      });

      if (res.ok) {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("total", JSON.stringify(total));
        setLoading(false);
        navigate("/checkoutpayment", {
          state: { items: cart, totalAmount: total },
        });
      } else {
        setLoading(false);
        alert("Failed to place order");
      }
    } catch (err) {
      console.error("Order error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] p-6 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4 lg:w-[70%] lg:mx-auto">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between bg-white border border-gray-200 shadow-sm p-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.product.name}</p>
                    <p className="text-md text-gray-600">
                      ₦ {item.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-col md:flex-row gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartQty(item.product._id, parseInt(e.target.value))
                    }
                    className="w-16 px-3 py-1 rounded border border-gray-300 text-gray-800 bg-white"
                  />
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-600 hover:text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
            <p className="text-lg font-semibold">
              Total: <span className="text-yellow-600">₦ {total.toLocaleString()}</span>
            </p>
            <button
              onClick={handlePlaceOrder}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
