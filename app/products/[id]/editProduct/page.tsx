"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const { id } = params; // Get the product ID from the URL
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    // Fetch product details when the component mounts
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`); // Adjust the endpoint to fetch by ID
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setImagePreview(data.photos); // Set the initial image preview
      } else {
        console.error("Failed to fetch product:", res.statusText);
      }
    }
    fetchProduct();
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Here you would handle the file upload to a server or storage service
      // Replace the placeholder URL below with the actual uploaded image URL
      const uploadedImageUrl = "https://example.com/uploaded-image-url.jpg"; // Replace with actual uploaded image URL
      setProduct({ ...product, photos: uploadedImageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...product }),
    });
    router.push("/products"); // Redirect to products page after editing
  };

  if (!product) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <div>
        <label className="block font-medium">Product Name</label>
        <input
          type="text"
          className="block w-full border p-2 rounded"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="border p-2 rounded w-full mt-2"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Color</label>
        <input
          type="text"
          className="block w-full border p-2 rounded"
          value={product.color}
          onChange={(e) => setProduct({ ...product, color: e.target.value })}
        />
      </div>

      <div>
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          className="block w-full border p-2 rounded"
          value={product.quantity}
          onChange={(e) =>
            setProduct({ ...product, quantity: +e.target.value })
          }
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block font-medium">Photos</label>

        {/* File Input for Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 border bg-gray-200 rounded"
        />

        {/* Display Uploaded Image URL */}
        <input
          type="text"
          className="block w-full border bg-gray-200 p-2 rounded mt-2"
          value={product.photos}
          onChange={(e) => setProduct({ ...product, photos: e.target.value })}
          placeholder="Image URL"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          className="block w-full border p-2 rounded"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="number"
          className="block w-full border p-2 rounded"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Save
      </button>
    </form>
  );
}
