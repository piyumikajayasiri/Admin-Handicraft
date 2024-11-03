import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // reference to Category model
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
