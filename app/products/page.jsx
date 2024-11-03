"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the API on component mount
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Navigate to the edit form with the selected product's ID
  const handleEdit = (id) => {
    router.push("/editProduct");
  };

  // Delete a product and update the local state to remove it from the list
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
      </div>

      <div className="bg-[#D9D9D9] rounded shadow p-4 w-full">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center p-1 border-b w-[600px]"
            >
              <span>{product.name}</span>
              <div>
                <button
                  onClick={() =>
                    router.push(`/products/${product._id}/editProduct`)
                  } // Navigate to edit page
                  className="text-black font-bold bg-[#D0A7A7] py-2 rounded-xl px-5 hover:bg-red-800 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-black font-bold bg-[#D0A7A7] py-2 rounded-xl px-5 hover:bg-red-800 mr-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found. Click Add New Product to get started.</p>
        )}
      </div>
      <div className="flex justify-end items-end mt-5">
        <button
          onClick={() => router.push("/addProduct")}
          className="bg-[#AB4949] text-white px-4 py-2 rounded"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
}
