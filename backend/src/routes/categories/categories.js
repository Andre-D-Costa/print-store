import { Category } from "../../models/index.js";

const categoryRoutes = [
  {
    method: "get",
    path: "/category",
    handler: async (req, res) => {
      const category = await Category.find().populate("category");
      res.json(category);
    },
  },
];

export default categoryRoutes;
