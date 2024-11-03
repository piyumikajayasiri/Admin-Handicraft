import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export async function POST(req) {
  await connectMongoDB();
  const data = await req.json();
  const product = new Product(data);
  await product.save();
  return new Response(JSON.stringify(product), { status: 201 });
}
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function PUT(req) {
  await connectMongoDB();
  const { id, ...data } = await req.json();
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  return new Response(JSON.stringify(product), { status: 200 });
}
export async function DELETE(req) {
  await connectMongoDB();
  const { id } = await req.json();
  await Product.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: "Product deleted" }), {
    status: 200,
  });
}
