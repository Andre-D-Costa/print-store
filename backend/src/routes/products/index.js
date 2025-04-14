import { response } from "express";
import { Product } from "../../models/index.js";
import { z } from "zod";

const RegexMongoObjectId = /^[0-9a-fA-F]{24}$/;

const idSchema = z.string().regex(RegexMongoObjectId, {
  message: "Invalid ID format",
});

const productSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(0),
    images: z.array(z.string()).optional(),
    sku: z.string(),
    slug: z.string().toLowerCase(),
    categoryId: z.string().optional(),
    isActive: z.boolean().default(true).optional(),
  })
  .strict();

const name = z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});

const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find().populate(["category"]);
      return res.status(200).json(products);
    },
  },
  {
    method: "get",
    path: "/products/:id",
    handler: async (req, res) => {
      try {
        const { id } = req.params;
        const result = idSchema.safeParse(id);
        if (!result.success) {
          return res.status(400).json({ message: "Invalid ID input" });
        }

        const product = await Product.findById(id).populate("category");
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
  {
    method: "post",
    path: "/products",
    handler: async (req, res) => {
      try {
        const response = productSchema.safeParse(req.body);

        if (!result.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: result.error.issues,
          });
        }

        const category = await Category.findById(response.data.categoryId);

        if (!category) {
          return res.status(400).json({ message: "Category not found" });
        }
        const product = await Product.create({
          ...response.data,
          category: response.data.categoryId,
        });

        await product.save();

        return res.status(201).json(req.product);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
  {
    method: "put",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find().populate("category");
      return res.json(products);
    },
  },
  {
    method: "delete",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find().populate("category");
      return res.json(products);
    },
  },
];

export default productRoutes;
