"use client";
import { useState, useEffect } from "react";

// CategoryForm Component
function CategoryForm({ onSave, editCategory }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
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
    if (editCategory) {
      setName(editCategory.name);
      setParentCategory(editCategory.parentCategory?._id || "");
    }
  }, [editCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editCategory ? `/api/categories` : `/api/categories`;
    const method = editCategory ? "PUT" : "POST";
    const body = {
      id: editCategory?._id,
      name,
      parentCategory: parentCategory || null,
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setName("");
    setParentCategory("");
    onSave(); // Refresh the table component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg mb-4">
      <div>
        <label className="w-[200px]">Create New Category</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" bg-gray-300 rounded-lg p-2 ml-3"
          placeholder="Category Name"
        />
      </div>
      <div>
        <label>Parent Category</label>
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="bg-gray-300 rounded-lg p-2 ml-12"
        >
          <option value="">No parent Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-[100px] items-center justify-center py-2 rounded-lg font-bold text-white bg-red-600 px-5">
        <button type="submit" className="btn-save">
          {editCategory ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}

// CategoryTable Component
function CategoryTable({ onEdit, refresh }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, [refresh]); // Add refresh as a dependency to refetch when it changes

  const handleDelete = async (id) => {
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    setCategories(categories.filter((cat) => cat._id !== id));
  };

  return (
    <div>
      <table className=" bg-gray-300 rounded-lg p-6 text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Category Name</th>
            <th className="px-4 py-2">Parent Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-t">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">
                {category.parentCategory
                  ? category.parentCategory.name
                  : "None"}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(category)}
                  className="items-center justify-center py-2 rounded-lg font-bold text-white bg-blue-600 px-5 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="items-center justify-center py-2 rounded-lg font-bold text-white bg-red-600 px-5"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Main Component
export default function CategoryManager() {
  const [refresh, setRefresh] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleSave = () => setRefresh(!refresh);

  return (
    <div className="p-6">
      <CategoryForm onSave={handleSave} editCategory={editCategory} />
      <CategoryTable
        onEdit={(category) => setEditCategory(category)}
        refresh={refresh}
      />
    </div>
  );
}
