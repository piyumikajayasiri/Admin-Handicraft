// app/api/settings/route.js
import { connectMongoDB } from "../../../lib/mongodb"; // Adjust the import based on your MongoDB setup
import User from "../../../models/user"; // Adjust this import based on your User model

export async function GET(req) {
  await connectMongoDB();

  const userId = req.cookies.get("userId"); // Ensure you're getting the user ID from cookies or session

  if (!userId) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const user = await User.findById(userId).select("name"); // Adjust the fields you need
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}

export async function PUT(req) {
  await connectMongoDB();

  const { name, password, userId } = await req.json();

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  user.name = name;
  if (password) {
    user.password = password; // Make sure to hash the password before saving
  }

  await user.save();

  return new Response(JSON.stringify({ message: "Settings updated" }), {
    status: 200,
  });
}
