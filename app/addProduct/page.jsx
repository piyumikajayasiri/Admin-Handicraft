// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddProduct() {
//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     color: "",
//     quantity: 0,
//     photos: "",
//     description: "",
//     price: 0,
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const router = useRouter();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       const res = await fetch("/api/categories");
//       const data = await res.json();
//       setCategories(data);
//     }
//     fetchCategories();
//   }, []);
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create a URL for the preview (optional)
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);

//       // Here you would handle the file upload to a server or storage service
//       // Example: upload the file to Cloudinary or your server and retrieve the URL
//       const uploadedImageUrl = "https://example.com/uploaded-image-url.jpg"; // Replace with the actual uploaded image URL after uploading
//       setProduct({ ...product, photos: uploadedImageUrl });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch("/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });
//     router.push("/products"); // Redirect to products page after adding the product
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 space-y-4 w-full mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Product Name</label>
//         <input
//           type="text"
//           className="block w-full border bg-gray-200 p-2 rounded"
//           value={product.name}
//           onChange={(e) => setProduct({ ...product, name: e.target.value })}
//           required
//         />
//       </div>

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Category</label>
//         <select
//           value={product.category}
//           onChange={(e) => setProduct({ ...product, category: e.target.value })}
//           className="border p-2 rounded w-full mt-2"
//         >
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Color</label>
//         <input
//           type="text"
//           className="block w-full border bg-gray-200 p-2 rounded"
//           value={product.color}
//           onChange={(e) => setProduct({ ...product, color: e.target.value })}
//         />
//       </div>

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Quantity</label>
//         <input
//           type="number"
//           className="block w-full border bg-gray-200 p-2 rounded"
//           value={product.quantity}
//           onChange={(e) =>
//             setProduct({ ...product, quantity: +e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Photos</label>

//         {/* File Input for Image Upload */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="block w-full p-2 border bg-gray-200 rounded"
//         />
//       </div>
//       {/* Image Preview */}
//       {imagePreview && (
//         <div className="mt-4 ">
//           <p className="text-sm">Image Preview:</p>
//           <img
//             src={imagePreview}
//             alt="Uploaded preview"
//             className="w-32 h-32 object-cover rounded"
//           />
//         </div>
//       )}

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Description</label>
//         <textarea
//           className="block w-full border bg-gray-200 p-2 rounded"
//           value={product.description}
//           onChange={(e) =>
//             setProduct({ ...product, description: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="flex flex-row gap-2">
//         <label className="block font-medium w-[200px]">Price</label>
//         <input
//           type="number"
//           className="block w-full border bg-gray-200 p-2 rounded"
//           value={product.price}
//           onChange={(e) => setProduct({ ...product, price: +e.target.value })}
//           required
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-[#AB4949] text-white px-6 py-2 rounded mt-4"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    quantity: 0,
    photos: "",
    description: "",
    price: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Upload the image to a storage service and retrieve the URL
      // This is a placeholder URL, replace it with the actual URL after uploading
      const uploadedImageUrl = "https://example.com/uploaded-image-url.jpg";
      setProduct({ ...product, photos: uploadedImageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        router.push("/products"); // Redirect to products page after adding the product
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Product Name</label>
        <input
          type="text"
          className="block w-full border bg-gray-200 p-2 rounded"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Category</label>
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Color</label>
        <input
          type="text"
          className="block w-full border bg-gray-200 p-2 rounded"
          value={product.color}
          onChange={(e) => setProduct({ ...product, color: e.target.value })}
        />
      </div>

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Quantity</label>
        <input
          type="number"
          className="block w-full border bg-gray-200 p-2 rounded"
          value={product.quantity}
          onChange={(e) =>
            setProduct({ ...product, quantity: +e.target.value })
          }
          required
        />
      </div>

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Photos</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 border bg-gray-200 rounded"
        />
      </div>

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

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Description</label>
        <textarea
          className="block w-full border bg-gray-200 p-2 rounded"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
        />
      </div>

      <div className="flex flex-row gap-2">
        <label className="block font-medium w-[200px]">Price</label>
        <input
          type="number"
          className="block w-full border bg-gray-200 p-2 rounded"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#AB4949] text-white px-6 py-2 rounded mt-4"
        >
          Save
        </button>
      </div>
    </form>
  );
}
