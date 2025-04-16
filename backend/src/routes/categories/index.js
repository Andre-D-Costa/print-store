const categoryRoutes = [
  {
    method: "get",
    path: "/category/",
    handler: async (req, res) => {
      try {
        const category = await Category.findById(id);
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(category);
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
];
