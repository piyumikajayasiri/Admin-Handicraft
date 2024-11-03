import connectMongoDB from "../../../../lib/mongodb"; // Import your MongoDB connection
import Category from "../../../../models/Category"; // Import your Category model
import { NextResponse } from "next/server";

// Connect to the database
connectMongoDB();

// GET Category by ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const category = await Category.findById(id).populate("parentCategory");
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT (Update) Category by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, parentCategory } = await req.json();

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, parentCategory: parentCategory || null },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE Category by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
