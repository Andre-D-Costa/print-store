import mongoose from "mongoose";
import { categorySchema } from "./category.js";
import { productSchema } from "./product.js";
import { authSchema } from "./auth.js";
import { orderSchema } from "./order.js";

export const Category = mongoose.model("Category", categorySchema);
export const Product = mongoose.model("Product", productSchema);
export const User = mongoose.model("User", authSchema);
export const Order = mongoose.model("Order", orderSchema);
