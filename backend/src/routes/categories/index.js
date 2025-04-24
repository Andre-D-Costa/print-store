import { Category } from "../../models/index.js";

const categoryRoutes = [
  {
    method: "get",
    path: "/categories",
    handler: async (req, res) => {
      try {
        const categories = await Category.find();
        if (categories.length === 0) {
          return res.status(404).json({ message: "No categories found" });
        }
        return res.status(200).json(categories);
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
];

export default categoryRoutes;
