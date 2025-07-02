import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../../components/AddProductModal";

function ManufacturerProducts() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("manufacturerToken")}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (data) => {
    setProducts([...products, data]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("manufacturerToken")}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          ➕ Add New Product
        </button>
      </div>

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
      />

      <div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gradient-to-br from-[#FFFDD0] via-[#CCCCFF] to-[#B3EBF2] rounded-xl shadow-md p-4"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-700">{product.description}</p>
                <p className="text-yellow-600 font-semibold mt-2">
                  Price: ₦{product.price}
                </p>
                <p className="text-gray-700">Stock: {product.stock}</p>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 mt-4 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">You have no products yet. Start by adding one.</p>
        )}
      </div>
    </div>
  );
}

export default ManufacturerProducts;
