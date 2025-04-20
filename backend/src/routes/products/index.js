import { response } from "express";
import { Product } from "../../models/index.js";
import { Category } from "../../models/index.js";
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
    images: z.array(z.string()),
    sku: z.string(),
    slug: z.string().toLowerCase(),
    categoryId: z.string().regex(RegexMongoObjectId),
    isActive: z.boolean().default(true),
  })
  .strict();

const slugSchema = z.string().toLowerCase();

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
    path: "/products/:slug",
    handler: async (req, res) => {
      try {
        const { slug } = req.params;
        const response = slugSchema.safeParse(slug);
        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }

        const product = await Product.findOne({ slug: response.data }).populate(
          "category"
        );
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

        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }

        const category = await Category.findById(response.data.categoryId);

        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
        const product = await Product.create({
          ...response.data,
          category: response.data.categoryId,
        });
        return res.status(201).json(product);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
  {
    method: "get",
    path: "/category",
    handler: async (req, res) => {
      const category = await Category.find();
      return res.status(200).json(category);
    },
  },
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
  {
    method: "put",
    path: "/products/:id",
    handler: async (req, res) => {
      try {
        const { id } = req.params;
        const response = idSchema.safeParse(id);
        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }
        const responseBody = productSchema.safeParse(req.body);
        if (!responseBody.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: responseBody.error.issues,
          });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          {
            ...responseBody.data,
          },
          { new: true }
        );
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(updatedProduct);
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
  // {
  //   method: "delete",
  //   path: "/products",
  //   handler: async (req, res) => {
  //     const products = await Product.find().populate("category");
  //     return res.json(products);
  //   },
  // },
];

export default productRoutes;
