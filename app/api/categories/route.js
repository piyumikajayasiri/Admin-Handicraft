import { connectMongoDB } from "../../../lib/mongodb";
import Category from "../../../models/Category";

import { NextResponse } from "next/server";

// GET: Fetch all categories
export async function GET() {
  await connectMongoDB();

  const categories = await Category.find().populate("parentCategory", "name");
  return NextResponse.json(categories);
}

// POST: Create a new category
export async function POST(req) {
  await connectMongoDB();

  const { name, parentCategory } = await req.json();
  const newCategory = new Category({
    name,
    parentCategory: parentCategory || null,
  });

  await newCategory.save();
  return NextResponse.json(newCategory, { status: 201 });
}

// PUT: Update a category by ID
export async function PUT(req) {
  await connectMongoDB();

  const { id, name, parentCategory } = await req.json();
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, parentCategory: parentCategory || null },
    { new: true }
  );

  if (!updatedCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(updatedCategory);
}

// DELETE: Delete a category by ID
export async function DELETE(req) {
  await connectMongoDB();

  const id = req.nextUrl.searchParams.get("id");
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Category deleted successfully" });
}
