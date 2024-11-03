import { connectMongoDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
export async function GET(req, { params }) {
  await connectMongoDB();
  const { id } = params;
  const product = await Product.findById(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), { status: 200 });
}
export default async function handler(req, res) {
  await connectMongoDB();

  const { method } = req;

  switch (method) {
    case "GET":
      // Fetch product by ID
      const product = await Product.findById(req.query.id);
      res.status(200).json(product);
      break;

    case "PUT":
      // Update product by ID
      const updatedProduct = await Product.findByIdAndUpdate(
        req.query.id,
        req.body,
        {
          new: true, // return the updated document
        }
      );
      res.status(200).json(updatedProduct);
      break;

    case "DELETE":
      // Handle deletion (if needed)
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
