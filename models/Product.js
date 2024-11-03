import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String },
  quantity: { type: Number, default: 0 },
  photos: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
