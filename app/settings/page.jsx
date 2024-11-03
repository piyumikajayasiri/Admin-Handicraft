"use client";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const fetchSettingsData = async () => {
    const res = await fetch("/api/settings");
    if (!res.ok) {
      console.error("Failed to fetch settings data");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setUser(data.user);
    setName(data.user?.name || "");
    setLoading(false);
  };

  const handleSave = async () => {
    const body = { name, password, userId: user?._id };

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Failed to update settings");
      return;
    }

    fetchSettingsData(); // Refresh data after save
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Settings</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="block w-full border bg-gray-200 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            className="block w-full border bg-gray-200 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="bg-[#AB4949] text-white px-4 py-2 rounded mt-4"
      >
        Save Settings
      </button>
    </div>
  );
}
