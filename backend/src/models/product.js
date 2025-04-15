import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [{ type: String }],
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
