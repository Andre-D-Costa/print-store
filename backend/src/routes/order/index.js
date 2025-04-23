import { z } from "zod";
import { Product } from "../../models/index.js";

export const orderSchema = z
  .object({
    email: z.string().email(),
    products: z.array(
      z.object({
        _id: z.string(),
        quantity: z.number(),
      })
    ),
  })
  .strict();

const orderRoutes = [
  {
    method: "post",
    path: "/orders",
    handler: async (req, res) => {
      try {
        const response = orderSchema.safeParse(req.body);

        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }

        const productIds = response.data.products.map((product) => product._id);

        const products = await Product.find({
          _id: { $in: productIds },
        });

        if (products.length !== productIds.length) {
          return res.status(400).json({
            message: "Products not found",
          });
        }
        return res.status(201).json({ products });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
];

export default orderRoutes;
