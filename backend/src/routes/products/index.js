import { Product } from "../../models/index.js";

const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find().populate("category");
      res.json(products);
    },
  },
  {
    method: "get",
    path: "/products/:id",
    handler: async (req, res) => {
      res.json({ name: "producto 1" });
    },
  },
];

export default productRoutes;
